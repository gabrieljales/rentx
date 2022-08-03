import { Repository } from "typeorm";

import { PostgresDataSource } from "../../../../database";
import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

// CategoriesRepository é um sub-tipo da interface ICategoriesRepository (Liskov Substitution Principle - SOLID)
class CategoriesRepository implements ICategoriesRepository {
  // Usando dessa maneira invés do extends, evita que as classes que chamam os repositories tenham acesso a
  // métodos do repository do typeorm
  private repository: Repository<Category>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Category);
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { name } });

    return category;
  }
}

export { CategoriesRepository };
