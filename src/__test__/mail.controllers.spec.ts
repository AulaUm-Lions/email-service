import { Request, Response } from "express";
import MailController from "../controllers/mail.controllers";
import { sendEmail } from "../services/mail.service";
import { config } from "../config/env";

jest.mock("../services/mail.service", () => ({
  sendEmail: jest.fn(),
}));

describe("MailController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnThis();

    req = {
      body: {
        to: "teste@exemplo.com",
        variables: {
          // Campos genéricos
          name: "Mateus",
          expirationTime: "2025-12-31",
          resetLink: "https://example.com/reset",
          app_dashboard_url: "https://dashboard.example.com",
          app_support_email: "suporte@example.com",
  
          // Campos de aula presencial
          classTitle: "Aula de Yoga",
          classDate: "2025-12-10",
          classTime: "10:00",
          instructorName: "João",
          locationName: "Studio Central",
          address: "Rua A, 123",
  
          // Campos de assinatura
          planName: "Premium",
          startDate: "2025-01-01",
          nextBillingDate: "2025-02-01",
          price: "99.90",
          billingCycle: "Mensal",
          paymentMethod: "Cartão",
  
          // Campos de compra
          courseTitle: "Curso Node.js",
          instructor: "Maria",
          purchaseDate: "2025-01-20",
  
          // Campos de renovação
          daysLeft: 5,
          expirationDate: "2025-11-30",
          renewalLink: "https://example.com/renovar",
        },
      },
    };

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  const controllers = [
    { name: "resetPassword", template: "reset", subject: "Redefinição de senha" },
    { name: "welcome", template: "welcome", subject: "Bem-vindo(a) à nossa plataforma!" },
    { name: "classInPersonReminder", template: "classInPersonReminder", subject: "Sua aula presencial começará em breve!" },
    { name: "classReminder", template: "classReminder", subject: "Lembrete da sua aula online" },
    { name: "planSubscription", template: "planSubscription", subject: "Confirmação de assinatura de plano" },
    { name: "purchaseConfirmation", template: "purchaseConfirmation", subject: "Confirmação de compra de aula/curso" },
    { name: "subscriptionRenewalReminder", template: "subscriptionRenewalReminder", subject: "Sua assinatura está prestes a expirar" },
  ];

  describe.each(controllers)("$name()", ({ name, template, subject }) => {
    it(`✅ deve enviar e-mail ${template} com sucesso`, async () => {
      (sendEmail as jest.Mock).mockResolvedValueOnce(undefined);

      await (MailController as any)[name](req as Request, res as Response);

      expect(sendEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: req.body.to,
          template,
          subject,
          variables: expect.objectContaining({
            app_dashboard_url: config.app_dashboard_url,
          }),
        })
      );

      expect(jsonMock).toHaveBeenCalledWith({
        message: expect.stringMatching(/enviado com sucesso/),
      });
    });

    it(`⚠️ deve retornar 400 se faltar campos obrigatórios`, async () => {
      req!.body = {}; // corpo vazio

      await (MailController as any)[name](req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringMatching(/obrigatórios/),
        })
      );
      expect(sendEmail).not.toHaveBeenCalled();
    });

    it(`❌ deve retornar 500 se o sendEmail lançar erro em ${name}`, async () => {
      (sendEmail as jest.Mock).mockRejectedValueOnce(new Error("SMTP ERROR"));

      await (MailController as any)[name](req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        error: "Falha ao enviar o e-mail.",
      });
    });
  });
});
