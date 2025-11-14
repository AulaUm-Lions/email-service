import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";
import { initMailTransport, configureTemplateEngine } from "../src/config/mail.config";

let initialized = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!initialized) {
      await initMailTransport();
      await configureTemplateEngine();
      initialized = true;
    }

    return app(req, res);
  } catch (err) {
    console.error("❌ Erro no servidor:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
