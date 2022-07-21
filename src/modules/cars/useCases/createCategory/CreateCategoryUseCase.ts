import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable() // Transformando esse use case em uma classe que pode ser injetada por outra classe (no caso, controller)
class CreateCategoryUseCase {
  /* Aplicando o DIP (Dependency Inversion Principle) do princípio SOLID (categoriesRepository no constructor).
    Invés do serviço ter essa dependência), vamos deixar essa responsabilidade para quem chamar o service.
    Se essa responsabilidade fosse do service, sempre teríamos uma instância diferente de uma categoria quando
    fossemos criar nos métodos */
  constructor(
    @inject("CategoriesRepository") // Injetando repositório
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    this.categoriesRepository.create({ description, name });
  }
}

export { CreateCategoryUseCase };
