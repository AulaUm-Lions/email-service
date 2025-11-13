const app = require("../src/app").default;
const { initMailTransport, configureTemplateEngine } = require("../src/config/mail.config");

let initialized = false;

module.exports = async (req, res) => {
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
};
