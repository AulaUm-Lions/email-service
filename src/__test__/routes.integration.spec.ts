// src/__tests__/routes.test.ts
import request from "supertest";
import { app } from "../app";

// Mock do serviço de envio de e-mail
jest.mock("../services/mail.service", () => ({
  sendEmail: jest.fn(async () => ({
    success: true,
    message: "E-mail de teste enviado!",
  })),
}));

describe("🧪 Testes de integração das rotas principais", () => {
  it("GET /api/health → deve retornar status OK", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      message: "Email service funcionando!",
    });
  });

  it("POST /api/email/welcome → deve simular envio de e-mail com sucesso", async () => {
    const response = await request(app)
      .post("/api/email/welcome/")
      .send({
        to: "teste@exemplo.com",
        type: "welcome",
        variables: { name: "Mateus" },
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
