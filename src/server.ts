import * as dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { PostgresDataSource } from "./database";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

dotenv.config();

// Estabelecendo conexão com o banco
PostgresDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

const port = process.env.APP_PORT;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
