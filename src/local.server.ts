import dotenv from "dotenv";
dotenv.config();

import { initMailTransport, configureTemplateEngine } from "./config/mail.config";
import app from "./app";

async function bootstrap() {
  try {
    await initMailTransport();
    await configureTemplateEngine();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀 Local server on port ${PORT}`));
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
  }
}

bootstrap();
