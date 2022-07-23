import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  // Importando os tipos (lá nas rotas não precisa pois o Router já "sabe")
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    // Tsyringe fazendo injeção de dependência de forma automática
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    // SRP e DIP - SOLID
    await createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
