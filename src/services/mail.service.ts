import { transporter } from "../config/mail.config";
import { EmailData } from "../interfaces/mail.interface";

// interface EmailData {
//   to: string;
//   type:
//     | "reset"
//     | "welcome"
//     | "classInPersonReminder"
//     | "classReminder"
//     | "planSubscription"
//     | "purchaseConfirmation"
//     | "subscriptionRenewalReminder";
//   variables?: Record<string, any>;
// }

export async function sendEmail({ to, template, subject, variables = {} }: EmailData) {
  // let subject = "";

  // switch (type) {
  //   case "reset":
  //     subject = "Redefinição de senha";
  //     break;
  //   case "welcome":
  //     subject = "Bem-vindo(a) à nossa plataforma!";
  //     break;
  //   case "classInPersonReminder":
  //     subject = "Sua aula presencial começará em breve!";
  //     break;
  //   case "classReminder":
  //     subject = "Lembrete da sua aula online";
  //     break;
  //   case "planSubscription":
  //     subject = "Confirmação de assinatura de plano";
  //     break;
  //   case "purchaseConfirmation":
  //     subject = "Confirmação de compra de aula/curso";
  //     break;
  //   case "subscriptionRenewalReminder":
  //     subject = "Sua assinatura está prestes a expirar";
  //     break;
  //   default:
  //     throw new Error("Tipo de e-mail inválido");
  // }

  // console.log(`Tentativa de envio de email "${type}" para ${to}`);

  interface NodemailerError extends Error {
    code?: string;
    command?: string;
    response?: string;
    responseCode?: number;
  }

  try {
    console.log(variables);
    await transporter.sendMail({
      from: '"Equipe de Suporte" <no-reply@aulaum.com>',
      to,
      subject,
      template: template, // o nome do arquivo handlebars (ex: reset.handlebars)
      context: variables,
    } as any);
  } catch (err) {
    const error = err as NodemailerError;

    console.error("--- FALHA CRÍTICA NO ENVIO DE EMAIL ---");
    console.error(`Destinatário(s): ${Array.isArray(to) ? to.join(", ") : to}`);
    console.error(`Assunto: ${subject}`);

    if (error.code) console.error(`CÓDIGO NODEMAILER/SMTP: ${error.code}`);
    if (error.response) console.error(`RESPOSTA DO SERVIDOR SMTP: ${error.response}`);

    console.error(`DESCRIÇÃO DO PROBLEMA: ${error.message}`);

    if (error.code === "EAUTH") {
      console.warn(
        "ALERTA: Credenciais de autenticação (usuário/senha) estão inválidas ou faltando."
      );
    }
  }

  console.log(`✅ E-mail "${template}" enviado para ${to}`);
}
