import "reflect-metadata";
import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

dotenv.config();

const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env.NODE_ENV === "test" ? "localhost" : process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_NAME
      : process.env.DB_NAME,
  migrations: [join(__dirname, "../typeorm/migrations/*.{js,ts}")],
  migrationsTableName: "migrations",
  entities: [
    join(__dirname, "../../../modules/**/infra/typeorm/entities/*.{ts,js}"),
  ],
});

export { PostgresDataSource };
