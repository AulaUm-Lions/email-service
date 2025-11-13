import dotenv from "dotenv";
dotenv.config();

import { initMailTransport, configureTemplateEngine } from "./config/mail.config";
import { app } from "./app";

async function bootstrap() {
  try {
    await initMailTransport();
    await configureTemplateEngine();
    console.log("Porta: ", process.env.PORT);
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
  }
}

bootstrap();
