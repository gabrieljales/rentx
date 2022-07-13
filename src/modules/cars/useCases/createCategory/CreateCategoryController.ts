import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  // Importando os tipos (lá nas rotas não precisa pois o Router já "sabe")
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    // SRP e DIP - SOLID
    this.createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };
