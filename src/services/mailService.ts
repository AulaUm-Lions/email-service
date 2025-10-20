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
  console.log(`Tentativa de envio de email "${type}" enviado para ${to}`);

  interface NodemailerError extends Error {
    code?: string;
    command?: string;
    response?: string;
    responseCode?: number;
  }
  
  try {
    await transporter.sendMail({
      from: '"Equipe de Suporte" <no-reply@aulaum.com>',
      to,
      subject,
      template: type,
      context: variables,
    } as any);
  } catch (err) {
    const error = err as NodemailerError;
    
    console.error("--- FALHA CRÍTICA NO ENVIO DE EMAIL ---");
    console.error(`Destinatário(s): ${Array.isArray(to) ? to.join(', ') : to}`);
    console.error(`Assunto: ${subject}`);
  
    if (error.code) {
      console.error(`CÓDIGO NODEMAILER/SMTP: ${error.code}`);
    }
    if (error.response) {
      console.error(`RESPOSTA DO SERVIDOR SMTP: ${error.response}`);
    }
  
    // Mensagem principal
    console.error(`DESCRIÇÃO DO PROBLEMA: ${error.message}`);
    
    // Exemplo de tratamento específico:
    if (error.code === 'EAUTH') {
      console.warn("ALERTA: Credenciais de autenticação (usuário/senha) estão inválidas ou faltando.");
    }
    
    // IMPORTANTE: Você provavelmente deve relançar um erro genérico
    // para que o cliente da API (se houver) receba um erro 500.
    // throw new Error("Não foi possível enviar o email."); 
  }


  console.log(`✅ E-mail "${type}" enviado para ${to}`);
}
