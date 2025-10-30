import nodemailer from "nodemailer";
import path from "path";
import { create } from "express-handlebars";
import hbs from "nodemailer-express-handlebars";
import { config } from "./env";
 
export let transporter: nodemailer.Transporter;

export async function initMailTransport() {
  transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    auth: {
      user: config.smtp_user,
      pass: config.smtp_pass
    }
  });

  console.log("✅ Transporter de e-mail configurado!");
}

export async function configureTemplateEngine() {
  const viewEngine = create({
    extname: ".handlebars",
    partialsDir: path.resolve("./src/templates/partials"),
    layoutsDir: path.resolve("./src/templates/layouts"),
    defaultLayout: false,
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine,
      viewPath: path.resolve("./src/templates"),
      extName: ".handlebars",
    })
  );

  console.log("✅ Handlebars configurado com sucesso!");
}
