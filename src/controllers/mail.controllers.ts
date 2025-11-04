import { Request, Response } from 'express';
import { sendEmail } from "../services/mail.service";
import { template } from 'handlebars';

class MailController
{
    async resetPassword(req: Request, res: Response) {
        try {
          const { to , variables} = req.body;
      
          if (!to ) {
            return res.status(400).json({ error: "Campos 'to' é obrigatório." });
          }
      
          await sendEmail({ to, template : "reset", subject: "Redefinição de senha", variables });
          return res.json({ message: `E-mail '${template}' enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async welcome(req: Request, res: Response) {
        try {
          const { to } = req.body;
      
          if (!to) {
            return res.status(400).json({ error: "Campos 'to' é obrigatórios." });
          }
      
          await sendEmail({ to, template: "welcome", subject: "Bem-vindo(a) à nossa plataforma!" });
          return res.json({ message: `E-mail '${template}' enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async classInPersonReminder(req: Request, res: Response) {
        try {
          const { to, variables } = req.body;
      
          if (!to) {
            return res.status(400).json({ error: "Campos 'to' é obrigatórios." });
          }
      
          await sendEmail({ to, template: "classInPersonReminder" ,subject: "Sua aula presencial começará em breve!", variables });
          return res.json({ message: `E-mail '${template}' enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async classReminder(req: Request, res: Response) {
        try {
          const { to } = req.body;
      
          if (!to) {
            return res.status(400).json({ error: "Campos 'to' é obrigatórios." });
          }
      
          await sendEmail({ to, template: "classReminder", subject: "Lembrete da sua aula online" });
          return res.json({ message: `E-mail '${template}' enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async planSubscription(req: Request, res: Response) {
        try {
          const { to } = req.body;
      
          if (!to) {
            return res.status(400).json({ error: "Campos 'to' é obrigatórios." });
          }
      
          await sendEmail({ to, template: "planSubscription", subject: "Confirmação de assinatura de plano" });
          return res.json({ message: `E-mail '${template}' enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async purchaseConfirmation(req: Request, res: Response) {
        try {
          const { to } = req.body;
      
          if (!to) {
            return res.status(400).json({ error: "Campos 'to' é obrigatórios." });
          }
      
          await sendEmail({ to, template: "purchaseConfirmation", subject: "Confirmação de compra de aula/curso" });
          return res.json({ message: `E-mail '${template}' enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async subscriptionRenewalReminder(req: Request, res: Response) {
        try {
          const { to } = req.body;
      
          if (!to) {
            return res.status(400).json({ error: "Campos 'to' é obrigatórios." });
          }
      
          await sendEmail({ to, template: "subscriptionRenewalReminder", subject: "Sua assinatura está prestes a expirar" });
          return res.json({ message: `E-mail '${template}' enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
}

export default new MailController();