import { transporter } from "../config/mail.config";
import { EmailData } from "../interfaces/mail.interface";

export async function sendEmail({ to, template, subject, variables = {} }: EmailData) {

  interface NodemailerError extends Error {
    code?: string;
    command?: string;
    response?: string;
    responseCode?: number;
  }

  try {
    await transporter.sendMail({
      from: '"Equipe de Suporte" <suporte@aulaum.com>',
      to,
      subject,
      template: template, // o nome do arquivo handlebars
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
