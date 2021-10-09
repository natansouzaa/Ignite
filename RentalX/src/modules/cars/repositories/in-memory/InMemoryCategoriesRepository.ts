import { Category } from '../../entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class InMemoryCategoriesRepository implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const categoryResponse = this.categories.find(
      category => category.name === name,
    );
    return categoryResponse;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    const allCategories = this.categories;
    return allCategories;
  }
}

export { InMemoryCategoriesRepository };
