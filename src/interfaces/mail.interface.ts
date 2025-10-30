export interface EmailData {
    to: string;
    template:
      | "reset"
      | "welcome"
      | "classInPersonReminder"
      | "classReminder"
      | "planSubscription"
      | "purchaseConfirmation"
      | "subscriptionRenewalReminder";
    subject: 
        | "Redefinição de senha"
        | "Bem-vindo(a) à nossa plataforma!"
        | "Sua aula presencial começará em breve!"
        | "Lembrete da sua aula online"
        | "Confirmação de assinatura de plano"
        | "Confirmação de compra de aula/curso"
        | "Sua assinatura está prestes a expirar";
    variables?: Record<string, any>;
  }