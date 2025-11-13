import { Request, Response } from "express";
import { sendEmail } from "../services/mail.service";
import { config } from "../config/env";

// ✅ Função utilitária para validar campos obrigatórios
function validarCampos(req: Request, res: Response, camposObrigatorios: string[]): boolean {
  const { to, variables } = req.body;

  if (!to || !variables) {
    res.status(400).json({ error: "Campos 'to' e 'variables' são obrigatórios." });
    return false;
  }

  for (const campo of camposObrigatorios) {
    if (!variables[campo]) {
      res.status(400).json({ error: `Campo '${campo}' é obrigatório.` });
      return false;
    }
  }

  return true;
}

class MailController {
  async resetPassword(req: Request, res: Response) {
    try {
      if (!validarCampos(req, res, ["name", "expirationTime", "resetLink"])) return;

      const { to, variables } = req.body;
      variables.app_dashboard_url = config.app_dashboard_url;

      await sendEmail({
        to,
        template: "reset",
        subject: "Redefinição de senha",
        variables,
      });

      return res.json({ message: "E-mail resetPassword enviado com sucesso." });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      return res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
  }

  async welcome(req: Request, res: Response) {
    try {
      if (!validarCampos(req, res, ["name"])) return;

      const { to, variables } = req.body;
      variables.app_dashboard_url = config.app_dashboard_url;

      await sendEmail({
        to,
        template: "welcome",
        subject: "Bem-vindo(a) à nossa plataforma!",
        variables,
      });

      return res.json({ message: "E-mail welcome enviado com sucesso." });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      return res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
  }

  async classInPersonReminder(req: Request, res: Response) {
    try {
      if (!validarCampos(req, res, [
        "name",
        "classTitle",
        "classDate",
        "classTime",
        "instructorName",
        "locationName",
        "address",
      ])) return;

      const { to, variables } = req.body;
      variables.app_dashboard_url = config.app_dashboard_url;
      variables.app_support_email = config.app_support_email;

      await sendEmail({
        to,
        template: "classInPersonReminder",
        subject: "Sua aula presencial começará em breve!",
        variables,
      });

      return res.json({ message: "E-mail classInPersonReminder enviado com sucesso." });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      return res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
  }

  async classReminder(req: Request, res: Response) {
    try {
      if (!validarCampos(req, res, [
        "name",
        "classTitle",
        "classDate",
        "classTime",
        "instructorName",
      ])) return;

      const { to, variables } = req.body;
      variables.app_dashboard_url = config.app_dashboard_url;
      variables.app_support_email = config.app_support_email;

      await sendEmail({
        to,
        template: "classReminder",
        subject: "Lembrete da sua aula online",
        variables,
      });

      return res.json({ message: "E-mail classReminder enviado com sucesso." });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      return res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
  }

  async planSubscription(req: Request, res: Response) {
    try {
      if (!validarCampos(req, res, [
        "name",
        "planName",
        "startDate",
        "nextBillingDate",
        "price",
        "billingCycle",
        "paymentMethod",
      ])) return;

      const { to, variables } = req.body;
      variables.app_dashboard_url = config.app_dashboard_url;
      variables.app_support_email = config.app_support_email;

      await sendEmail({
        to,
        template: "planSubscription",
        subject: "Confirmação de assinatura de plano",
        variables,
      });

      return res.json({ message: "E-mail planSubscription enviado com sucesso." });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      return res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
  }

  async purchaseConfirmation(req: Request, res: Response) {
    try {
      if (!validarCampos(req, res, [
        "name",
        "courseTitle",
        "instructor",
        "purchaseDate",
        "price",
      ])) return;

      const { to, variables } = req.body;
      variables.app_dashboard_url = config.app_dashboard_url;

      await sendEmail({
        to,
        template: "purchaseConfirmation",
        subject: "Confirmação de compra de aula/curso",
        variables,
      });

      return res.json({ message: "E-mail purchaseConfirmation enviado com sucesso." });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      return res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
  }

  async subscriptionRenewalReminder(req: Request, res: Response) {
    try {
      if (!validarCampos(req, res, [
        "name",
        "planName",
        "daysLeft",
        "expirationDate",
        "renewalLink",
      ])) return;

      const { to, variables } = req.body;
      variables.app_dashboard_url = config.app_dashboard_url;
      variables.app_support_email = config.app_support_email;

      await sendEmail({
        to,
        template: "subscriptionRenewalReminder",
        subject: "Sua assinatura está prestes a expirar",
        variables,
      });

      return res.json({ message: "E-mail subscriptionRenewalReminder enviado com sucesso." });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      return res.status(500).json({ error: "Falha ao enviar o e-mail." });
    }
  }
}

export default new MailController();
