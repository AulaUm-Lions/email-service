import nodemailer from "nodemailer";
import path from "path";
import { create } from "express-handlebars";
import hbs from "nodemailer-express-handlebars";

export let transporter: nodemailer.Transporter;

export async function initMailTransport() {
  transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "a79ea12dc9f7d2",
      pass: "****7a0c"
    }
  });

//   transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'celestine.wolff31@ethereal.email',
//         pass: 'qZ4V6x2T1dZr7RR53Y'
//     }
// })
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
