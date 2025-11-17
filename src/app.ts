import express, { Express } from "express";
import { routes } from "./routes/routes";
import cors from "cors";
import { cid } from "./middleware/cid.middleware";
import { log } from "./middleware/log.middleware";
import { errorHandling } from "./middleware/error-handling.middleware";

import swagger from "swagger-ui-express";
import * as swaggerDocument from "./docs/swagger.json";

const app: Express = express();

app.use(cid);
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);

// swagger
app.get("/swagger.json", (req, res) => {
  res.send(swaggerDocument);
});

app.use("/api-docs", swagger.serve, swagger.setup(null, {
  swaggerOptions: { url: "/swagger.json" }
}));

// REMOVE prefixo "/api"
app.use("/api", routes);

// erros
app.use(errorHandling);

export default app;
