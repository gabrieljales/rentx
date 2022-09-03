import { hash } from "bcrypt";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidV4 } from "uuid";

export class adminSeed1662164379406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    const id = uuidV4();
    const hashPassword = await hash(ADMIN_PASSWORD, 8);

    await queryRunner.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, drive_license)
      values('${id}', 'admin', '${ADMIN_EMAIL}','${hashPassword}', true, 'now()', 'XXXXXX')
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM public."users" WHERE email = $1', [
      "admin@rentx.com.br",
    ]);
  }
}
