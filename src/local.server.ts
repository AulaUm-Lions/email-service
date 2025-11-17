import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { initMailTransport, configureTemplateEngine } from "./config/mail.config";

async function bootstrap() {
  await initMailTransport();
  await configureTemplateEngine();

  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
}

bootstrap();
