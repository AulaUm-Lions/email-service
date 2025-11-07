import { Request, Response } from 'express';
import { sendEmail } from "../services/mail.service";
import { template } from 'handlebars';
import { config } from '../config/env';

class MailController
{
    async resetPassword(req: Request, res: Response) {
        try {
          const { to , variables } = req.body;
      
          if (!to &&
              !variables.name &&
              !variables.expirationTime &&
              !variables.resetLink
           ) {
            return res.status(400).json({ error: "Campos 'to' e 'variables' são obrigatórios." });
          }
          variables.app_dashboard_url=config.app_dashboard_url;
          await sendEmail({ to, template : "reset", subject: "Redefinição de senha", variables });
          return res.json({ message: `E-mail resetPassword enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async welcome(req: Request, res: Response) {
        try {
          const { to, variables } = req.body;
      
          if (!to ||
              !variables.name
          ) {
            return res.status(400).json({ error: "Campos 'to' e 'variables' são obrigatórios." });
          }
          variables.app_dashboard_url=config.app_dashboard_url;
          await sendEmail({ to, template: "welcome", subject: "Bem-vindo(a) à nossa plataforma!", variables });
          return res.json({ message: `E-mail welcome enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async classInPersonReminder(req: Request, res: Response) {
        try {
          const { to, variables } = req.body;
      
          if (!to &&
              !variables.name &&
              !variables.classTitle &&
              !variables.classDate &&
              !variables.classTime &&
              !variables.instructorName &&
              !variables.locationName &&
              !variables.address ) {
            return res.status(400).json({ error: "Campos 'to' e 'variables' são obrigatórios." });
          }
          variables.app_dashboard_url=config.app_dashboard_url;
          variables.app_support_email=config.app_support_email;
          await sendEmail({ to, template: "classInPersonReminder" ,subject: "Sua aula presencial começará em breve!", variables });
          return res.json({ message: `E-mail classInPersonReminder enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async classReminder(req: Request, res: Response) {
        try {
          const { to, variables } = req.body;
      
          if (!to &&
              !variables.name &&
              !variables.classTitle &&
              !variables.clasDate &&
              !variables.classTime &&
              !variables.instructorName 
          ) {
            return res.status(400).json({ error: "Campos 'to' e 'variables' são obrigatórios." });
          }
          variables.app_dashboard_url=config.app_dashboard_url;
          variables.app_support_email=config.app_support_email;
          await sendEmail({ to, template: "classReminder", subject: "Lembrete da sua aula online", variables });
          return res.json({ message: `E-mail classReminder enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async planSubscription(req: Request, res: Response) {
        try {
          const { to, variables } = req.body;
      
          if (!to &&
              !variables.name &&
              !variables.planName &&
              !variables.startDate &&
              !variables.nextBillingDate &&
              !variables.price &&
              !variables.billingCycle &&
              !variables.paymentMethod
          ) {
            return res.status(400).json({ error: "Campos 'to' e 'variables' são obrigatórios." });
          }
          variables.app_dashboard_url=config.app_dashboard_url;
          variables.app_support_email=config.app_support_email;
          await sendEmail({ to, template: "planSubscription", subject: "Confirmação de assinatura de plano", variables });
          return res.json({ message: `E-mail planSubscription enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async purchaseConfirmation(req: Request, res: Response) {
        try {
          const { to, variables } = req.body;
      
          if (!to &&
              !variables.name &&
              !variables.courseTitle &&
              !variables.instructor &&
              !variables.purchaseDate &&
              !variables.price
          ) {
            return res.status(400).json({ error: "Campos 'to' e 'variables' são obrigatórios." });
          }
          variables.app_dashboard_url=config.app_dashboard_url;
          await sendEmail({ to, template: "purchaseConfirmation", subject: "Confirmação de compra de aula/curso", variables });
          return res.json({ message: `E-mail purchaseConfirmation enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
      async subscriptionRenewalReminder(req: Request, res: Response) {
        try {
          const { to, variables } = req.body;
      
          if (!to &&
              !variables.name &&
              !variables.planName &&
              !variables.daysLeft &&
              !variables.expirationDate &&
              !variables.renewalLink
          ) {
            return res.status(400).json({ error: "Campos 'to' e 'variables' são obrigatórios." });
          }
          variables.app_dashboard_url=config.app_dashboard_url;
          variables.app_support_email=config.app_support_email;
          await sendEmail({ to, template: "subscriptionRenewalReminder", subject: "Sua assinatura está prestes a expirar", variables });
          return res.json({ message: `E-mail subscriptionRenewalReminder enviado com sucesso.` });
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          return res.status(500).json({ error: "Falha ao enviar o e-mail." });
        }
      };
}

export default new MailController();