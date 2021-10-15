import { AppError } from '../../../../shared/errors/AppError';
import { InMemoryCarsRepository } from '../../repositories/in-memory/InMemoryCarsRepository';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe('Create car', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: '1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category_id',
    });

    expect(car).toHaveProperty('id');
  });

  it('Shold be not able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        description: 'Description car',
        daily_rate: 100,
        license_plate: '1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category_id',
      });

      await createCarUseCase.execute({
        name: 'Car2',
        description: 'Description car',
        daily_rate: 100,
        license_plate: '1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'Category_id',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Shold be able to create a car with available true by defalt', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      description: 'Description car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category_id',
    });

    expect(car.available).toBe(true);
  });
});
