import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";

dotenv.config();

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ["src/database/migrations/*.{js,ts}"],
  migrationsTableName: "migrations",
  entities: [Category],
});

export { PostgresDataSource };
