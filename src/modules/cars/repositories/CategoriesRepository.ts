import { Category } from "../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

// CategoriesRepository é um sub-tipo da interface ICategoriesRepository (Liskov Substitution Principle - SOLID)
class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  // Responsável por criar uma instância ou repassar uma instância já existente para uma requisição (seguindo singleton)
  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      // Se não tiver uma instância
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }
    // Se tiver uma instância
    return CategoriesRepository.INSTANCE;
  }

  create({ description, name }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
