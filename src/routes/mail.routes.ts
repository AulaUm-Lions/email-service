import { Router } from "express";
import { sendEmail } from "../services/mailService";

const router = Router();

router.post("/send", async (req, res) => {
  try {
    const { to, type, variables } = req.body;

    if (!to || !type) {
      return res.status(400).json({ error: "Campos 'to' e 'type' são obrigatórios." });
    }

    await sendEmail({ to, type, variables });
    res.json({ message: `E-mail '${type}' enviado com sucesso.` });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Falha ao enviar o e-mail." });
  }
});

export default router;
