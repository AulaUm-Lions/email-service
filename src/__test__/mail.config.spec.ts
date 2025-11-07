import nodemailer from "nodemailer";
import path from "path";
import { initMailTransport, configureTemplateEngine, transporter } from "../config/mail.config";

// 🧰 Mock do nodemailer
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    use: jest.fn(),
  })),
}));

// 🧰 Mock do nodemailer-express-handlebars
jest.mock("nodemailer-express-handlebars", () => jest.fn(() => "mockedHbs"));

// 🧰 Mock do express-handlebars
jest.mock("express-handlebars", () => ({
  create: jest.fn(() => "mockedViewEngine"),
}));

describe("MailConfig", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initMailTransport deve configurar o transporter corretamente", async () => {
    await initMailTransport();

    expect(nodemailer.createTransport).toHaveBeenCalledTimes(1);
    expect(transporter).toBeDefined();
    expect((nodemailer.createTransport as jest.Mock).mock.calls[0][0]).toMatchObject({
      host: expect.any(String),
      port: expect.any(Number),
      auth: expect.any(Object),
    });
  });

  test("configureTemplateEngine deve configurar o handlebars no transporter", async () => {
    await initMailTransport();
    const mockTransporter = transporter as any;

    await configureTemplateEngine();

    expect(mockTransporter.use).toHaveBeenCalledWith("compile", "mockedHbs");
  });
});
