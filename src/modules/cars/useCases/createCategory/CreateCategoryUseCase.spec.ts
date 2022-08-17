import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

// Describe: Agrupa testes
describe("Create Category", () => {
  // beforeEach: Antes de algum teste, fazer determinada função
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  // It: Os testes em si
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Teste",
      description: "Category Description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    // Verificando se a categoria foi salva com sucesso
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    // O objeto categoria inicialmente não tem um ID. Se ela foi salva com sucesso, terá um ID
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category Teste",
        description: "Category Description Test",
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      // Tentando salvar novamente para testar o comportamento ao criar uma categoria que já existe
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError); // Se for rejeitado, que seja de uma instância da nossa classe de erros
  });
});
