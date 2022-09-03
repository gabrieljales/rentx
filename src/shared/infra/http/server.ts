import "reflect-metadata";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"; // Deve ser importada depois do import do express!
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";

import { PostgresDataSource } from "../typeorm";

import "@shared/container";
import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

dotenv.config();

// Estabelecendo conexão com o banco
PostgresDataSource.initialize()
  .then(() => {
    console.log("Postgres Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

const port = process.env.APP_PORT;
app.listen(port, () => console.log(`Server is running on port ${port}!`));
