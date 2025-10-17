// src/app.ts
import express, { Express } from "express";
import { routes } from "./routes/routes";
import cors from "cors";
import { cid } from "./middleware/cid.middleware";
import { log } from "./middleware/log.middleware";
import { errorHandling } from "./middleware/error-handling.middleware";

const app: Express = express();

app.use(cid);
app.use(cors({
    origin: ["*"], // domínio(s) permitido(s)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);

// Configuração das rotas
app.use("/api", routes); // ✅ prefixo opcional para padronizar

// Tratativa de erros da aplicação
app.use(errorHandling);

export { app };
