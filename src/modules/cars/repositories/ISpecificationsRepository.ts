import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ISpecificationsRepository {
  create({
    description,
    name,
  }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
