import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// Envolvendo em uma função, nos permite ter um controle maior. A função só vai ser acessada, quando for chamada
// Logo, o repositório só será instanciado quando a função for chamada (além de que só chama depois que a conexão com o
// bd foi feita)
export default (): CreateCategoryController => {
  // Instanciando o CategoriesRepository (singleton)
  const categoriesRepository = new CategoriesRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );
  return createCategoryController;
};
