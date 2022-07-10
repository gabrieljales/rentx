import { Request, Response } from "express";

import { ListCategoriesUseCases } from "./ListCategoriesUseCases";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCases) {}

  handle(request: Request, response: Response): Response {
    const all = this.listCategoriesUseCase.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };
