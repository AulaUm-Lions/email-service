import dotenv from "dotenv";
dotenv.config();

import { initMailTransport, configureTemplateEngine } from "./config/mailConfig";
import { app } from "./app";

async function bootstrap() {
  try {
    await initMailTransport();
    await configureTemplateEngine();

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
  }
}

bootstrap();
