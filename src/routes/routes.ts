// src/routes/routes.ts
import { Router } from "express";
import emailRoutes from "./mail.routes";

const routes = Router();

routes.use("/email", emailRoutes);

// Exemplo: rota de status do serviço
routes.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Email service funcionando!" });
});

export { routes };
