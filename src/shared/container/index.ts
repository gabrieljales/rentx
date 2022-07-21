// Arquivo para o tsyringe
import { container } from "tsyringe";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

container.registerSingleton<ICategoriesRepository>(
  // Nome do container e a classe que queremos chamar toda vez que o nome for chamado
  "CategoriesRepository",
  CategoriesRepository
);
