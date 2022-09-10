import { In, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { PostgresDataSource } from "@shared/infra/typeorm";

import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Specification);
  }

  async create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    // Método findByIds está @deprecated, usar findBy + operador In()
    const specifications = await this.repository.findBy({ id: In(ids) });

    return specifications;
  }
}

export { SpecificationsRepository };
