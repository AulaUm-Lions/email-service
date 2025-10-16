import dotenv from "dotenv";
dotenv.config();

export const config = {
  node_env: process.env.NODE_ENV,

  // 🔹 Configuração do servidor
  port: Number(process.env.PORT),

  // 🔹 Configuração do banco de dados
  db_host: process.env.DB_HOST,
  db_port: Number(process.env.DB_PORT),
  db_database: process.env.DB_DATABASE,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,

  // 🔹 Configuração de SMTP
  smtp_host: process.env.SMTP_HOST,
  smtp_port: Number(process.env.SMTP_PORT),
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  smtp_secure: process.env.SMTP_SECURE,

  // 🔹 Configurações adicionais
  mail_from_name: process.env.MAIL_FROM_NAME,
  mail_from_email: process.env.MAIL_FROM_EMAIL,
  app_base_url: process.env.APP_BASE_URL,
};
