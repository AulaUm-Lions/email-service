// src/config/env.ts
import dotenv from "dotenv";
dotenv.config(); // Carrega as variáveis do .env

export const config = {
  node_env: process.env.NODE_ENV,
  port: Number(process.env.PORT),

  // 🔹 SMTP
  smtp_host: process.env.SMTP_HOST,
  smtp_port: Number(process.env.SMTP_PORT),
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  smtp_secure: process.env.SMTP_SECURE,

  // 🔹 Remetente padrão
  mail_from_name: process.env.MAIL_FROM_NAME,
  mail_from_email: process.env.MAIL_FROM_EMAIL,

  // 🔹 URL base
  app_base_url: process.env.APP_BASE_URL,
};
