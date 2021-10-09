import { AppError } from '../../../../errors/AppError';
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/InMemoryCategoriesRepository';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(
      inMemoryCategoriesRepository,
    );
  });

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test.',
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await inMemoryCategoriesRepository.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('Should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category test',
        description: 'Category description test.',
      };

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
