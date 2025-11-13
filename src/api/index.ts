import app from "../app";
import { initMailTransport, configureTemplateEngine } from "../config/mail.config";

// Inicialização única por execução
let initialized = false;

export default async function handler(req: any, res: any) {
  try {
    if (!initialized) {
      await initMailTransport();
      await configureTemplateEngine();
      initialized = true;
    }

    return app(req, res); // delega o request ao Express
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
