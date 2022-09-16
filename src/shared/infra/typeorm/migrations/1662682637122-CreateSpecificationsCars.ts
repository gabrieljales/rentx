import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1662682637122
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_cars",

        // Note que essa tabela não tem uma coluna de "ID". Se tivesse, teríamos que criar uma entidade, um repositório e etc. Motivo: A especificação por si só não faz sentido, mas sim quando fazemos um cadastro de um carro. Então podemos salvar dados em tabelas, sem que seja necessário criar uma entidade e repositório, podemos utilizar a própria entidade de carros (pois a especificação está mais atrelada ao carro)
        columns: [
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "specification_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
    // Maneira diferente de criar foreignKey (outra maneira na migração de createCars)
    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FKSpecificationCar",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specification_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "specifications_cars",
      new TableForeignKey({
        name: "FKCarSpecification",
        referencedTableName: "cars",
        referencedColumnNames: ["id"],
        columnNames: ["car_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FKCarSpecification"
    );

    await queryRunner.dropForeignKey(
      "specifications_cars",
      "FKSpecificationCar"
    );

    await queryRunner.dropTable("specifications_cars");
  }
}
