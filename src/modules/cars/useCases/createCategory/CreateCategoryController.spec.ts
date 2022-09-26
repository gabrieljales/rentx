// Teste de integração

import { hash } from "bcrypt";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import { PostgresDataSource } from "@shared/infra/typeorm";

let dataSource: DataSource;
const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    dataSource = await PostgresDataSource.initialize();
    await dataSource.runMigrations();

    const id = uuidV4();
    const hashPassword = await hash(ADMIN_PASSWORD, 8);

    await dataSource.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, drive_license)
      values('${id}', 'admin', '${ADMIN_EMAIL}','${hashPassword}', true, 'now()', 'XXXXXX')
      `
    );
  });

  afterAll(async () => {
    await PostgresDataSource.dropDatabase();
    await PostgresDataSource.destroy(); // Substituto do .close()
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({
        email: `${ADMIN_EMAIL}`,
        password: `${ADMIN_PASSWORD}`,
      });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with name exists", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({
        email: `${ADMIN_EMAIL}`,
        password: `${ADMIN_PASSWORD}`,
      });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
