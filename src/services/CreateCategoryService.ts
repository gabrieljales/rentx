import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {
    /* Aplicando o DIP (Dependency Inversion Principle) do princípio SOLID (categoriesRepository no constructor).
    Invés do serviço ter essa dependência), vamos deixar essa responsabilidade para quem chamar o service.
    Se essa responsabilidade fosse do service, sempre teríamos uma instância diferente de uma categoria quando
    fossemos criar nos métodos */
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ description, name }: IRequest): void {
        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category already exists!");
        }

        this.categoriesRepository.create({ description, name });
    }
}

export { CreateCategoryService };
