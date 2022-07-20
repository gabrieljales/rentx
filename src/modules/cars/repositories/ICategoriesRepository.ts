import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ description, name }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };

/**
 * Importância dessa interface:
 *
 * -> Qualquer classe que implementar essa interface, ou seja, qualquer classe que seja um subtipo dessa interface
 * poderá ser utilizada sem alterar o comportamento do sistema.
 *
 * Exemplo: Imagine que temos uma classe chamada CategoriesRepository02 que implementa a interface
 * ICreateCategoriesRepository. Como ela é um subtipo dessa interface, assim como CategoriesRepository, podemos
 * usá-la nas nossas rotas (const categoriesRepository = new CategoriesRepository02();)
 *
 * Esse é o Liskov Substitution Principle, do SOLID.
 */
