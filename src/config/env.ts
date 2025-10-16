import dotenv from "dotenv";
dotenv.config();

export const config = {
  node_env: process.env.NODE_ENV || "dev",

  // 🔹 Configuração do servidor
  port: Number(process.env.PORT) || 4000,

  // 🔹 Configuração do banco de dados
  db_host: process.env.DB_HOST || "localhost",
  db_port: Number(process.env.DB_PORT) || 5432,
  db_database: process.env.DB_DATABASE || "meu_banco",
  db_user: process.env.DB_USER || "postgres",
  db_password: process.env.DB_PASSWORD || "senha123",

  // 🔹 Configuração de SMTP
  smtp_host: process.env.SMTP_HOST,
  smtp_port: Number(process.env.SMTP_PORT) || 587,
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  smtp_secure: process.env.SMTP_SECURE === "true",

  // 🔹 Configurações adicionais
  mail_from_name: process.env.MAIL_FROM_NAME || "MeuApp",
  mail_from_email: process.env.MAIL_FROM_EMAIL || "no-reply@meuapp.com",
  app_base_url: process.env.APP_BASE_URL || "http://localhost:4000",
};
