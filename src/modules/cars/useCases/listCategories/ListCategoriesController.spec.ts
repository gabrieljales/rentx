import { hash } from "bcrypt";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";
import { PostgresDataSource } from "@shared/infra/typeorm";

let dataSource: DataSource;
const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

describe("List Categories Controller", () => {
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

  it("should be able to list all categories", async () => {
    const responseToken = await request(app)
      .post("/sessions")
      .send({
        email: `${ADMIN_EMAIL}`,
        password: `${ADMIN_PASSWORD}`,
      });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
});
