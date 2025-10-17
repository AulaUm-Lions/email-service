// src/middleware/log.middleware.ts
import morgan from "morgan";
import fs from "fs";
import path from "path";

// Cria o caminho para os logs
const logDir = path.join(__dirname, "..", "storage");

// Garante que a pasta exista
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Cria o stream de escrita (somente para dev)
const fileLog = fs.createWriteStream(path.join(logDir, "access.log"), {
  flags: "a",
});

// Usa o morgan só se **não** estiver em produção
export const log =
  process.env.NODE_ENV === "production"
    ? (req: any, res: any, next: any) => next() // middleware vazio
    : morgan("combined", { stream: fileLog });
