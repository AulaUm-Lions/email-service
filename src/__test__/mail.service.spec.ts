import nodemailer from "nodemailer";
import { sendEmail } from "../services/mail.service";
import { transporter } from "../config/mail.config";
import { EmailData } from "../interfaces/mail.interface";

// Mockando o nodemailer
jest.mock("nodemailer");

const sendMailMock = jest.fn();

// Força o mock do transporte do Nodemailer
(nodemailer.createTransport as jest.Mock).mockReturnValue({
  sendMail: sendMailMock,
});

describe("sendEmail()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (transporter as any) = nodemailer.createTransport();
  });

  it("deve enviar o e-mail com sucesso", async () => {
    sendMailMock.mockResolvedValueOnce("OK");

    const emailData: EmailData = {
      to: "teste@exemplo.com",
      subject: "Bem-vindo(a) à nossa plataforma!",
      template: "welcome",
      variables: {
            name: "Mateus",
            dashboardUrl: "https://dashboardAulaUm.onrender.com"
       },
    };

    await expect(sendEmail(emailData)).resolves.not.toThrow();

    expect(sendMailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: '"Equipe de Suporte" <suporte@aulaum.com>',
        to: "teste@exemplo.com",
        subject: "Bem-vindo(a) à nossa plataforma!",
        template: "welcome",
        context:  {
            name: "Mateus",
            dashboardUrl: "https://dashboardAulaUm.onrender.com"
        }
      })
    );
  });

  it("deve capturar erro genérico de envio (SMTP falhou)", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("Falha SMTP genérica"));

    const emailData: EmailData = {
      to: "erro@exemplo.com",
      subject: "Bem-vindo(a) à nossa plataforma!",
      template: "welcome",
      variables: {},
    };

    await expect(sendEmail(emailData)).resolves.not.toThrow();

    expect(sendMailMock).toHaveBeenCalled();
  });

  it("deve capturar erro de autenticação (EAUTH)", async () => {
    const authError = new Error("Invalid credentials") as any;
    authError.code = "EAUTH";
    authError.response = "535 5.7.0 Invalid credentials";

    sendMailMock.mockRejectedValueOnce(authError);

    const emailData: EmailData = {
      to: "authfail@exemplo.com",
      subject: "Bem-vindo(a) à nossa plataforma!",
      template: "welcome",
      variables: {},
    };

    await expect(sendEmail(emailData)).resolves.not.toThrow();

    expect(sendMailMock).toHaveBeenCalled();
  });

  it("deve capturar erro de conexão (ECONNREFUSED)", async () => {
    const connError = new Error("Connection refused") as any;
    connError.code = "ECONNREFUSED";
    connError.response = "Cannot connect to SMTP";

    sendMailMock.mockRejectedValueOnce(connError);

    const emailData: EmailData = {
      to: "fail@exemplo.com",
      subject: "Bem-vindo(a) à nossa plataforma!",
      template: "welcome",
      variables: {},
    };

    await expect(sendEmail(emailData)).resolves.not.toThrow();

    expect(sendMailMock).toHaveBeenCalled();
  });

  it("deve exibir logs mesmo com falha no envio", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    sendMailMock.mockRejectedValueOnce(new Error("Falha de rede"));

    const emailData: EmailData = {
      to: "falha@exemplo.com",
      subject: "Bem-vindo(a) à nossa plataforma!",
      template: "welcome",
      variables: {},
    };

    await sendEmail(emailData);

    expect(errorSpy).toHaveBeenCalledWith(expect.stringMatching(/FALHA CRÍTICA/));
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/E-mail "welcome" enviado/)
    );

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
