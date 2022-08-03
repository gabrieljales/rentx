import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../entities/Specification";

interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<void>;

  findByName(name: string): Promise<Specification>;

  list(): Promise<Specification[]>;
}

export { ISpecificationsRepository };
