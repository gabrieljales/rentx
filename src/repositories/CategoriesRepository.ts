import { Category } from "../model/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDto,
} from "./ICategoriesRepository";

// CategoriesRepository é um sub-tipo da interface ICategoriesRepository (Liskov Substitution Principle - SOLID)
class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ description, name }: ICreateCategoryDto): void {
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
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category;
    }
}

export { CategoriesRepository };
