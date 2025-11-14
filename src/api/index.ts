import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../app";
import { initMailTransport, configureTemplateEngine } from "../config/mail.config";

let initialized = false;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!initialized) {
      await initMailTransport();
      await configureTemplateEngine();
      initialized = true;
    }

    return app(req as any, res as any);
  } catch (error) {
    console.error("❌ Erro no servidor:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
