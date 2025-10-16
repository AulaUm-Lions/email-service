import { transporter } from "../config/mailConfig";

interface EmailData {
  to: string;
  type: "reset" | "welcome" | "notification";
  variables?: Record<string, any>;
}

export async function sendEmail({ to, type, variables = {} }: EmailData) {
  let subject = "";

  switch (type) {
    case "reset":
      subject = "Redefinição de senha";
      break;
    case "welcome":
      subject = "Bem-vindo(a) à nossa plataforma!";
      break;
    case "notification":
      subject = "Você tem uma nova notificação";
      break;
    default:
      throw new Error("Tipo de e-mail inválido");
  }

  await transporter.sendMail({
    from: '"Equipe de Suporte" <no-reply@aulaum.com>',
    to,
    subject,
    template: type, // nome do arquivo handlebars
    context: variables, // dados que vão preencher o template
  }as any);

  console.log(`✅ E-mail "${type}" enviado para ${to}`);
}
