const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  // Define o ambiente Node.js
  testEnvironment: "node",

  // Aplica o transform do ts-jest
  transform: {
    ...tsJestTransformCfg,
  },

  // Faz o Jest reconhecer arquivos .ts e .tsx
  moduleFileExtensions: ["ts", "tsx", "js"],

  // Garante que o Jest busque testes dentro de src/
  roots: ["<rootDir>/src"],

  // Modo verbose (opcional, mas útil pra debug)
  verbose: true,

  // Ignora build (dist/) para evitar conflito
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // ✅ Isso é crucial se você estiver usando `type: "module"` no package.json
  // Força Jest a rodar em modo CommonJS (senão o ESM quebra imports)
  extensionsToTreatAsEsm: [],
};
