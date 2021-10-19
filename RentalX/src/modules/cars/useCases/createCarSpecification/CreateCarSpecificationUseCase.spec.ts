import { AppError } from '../../../../shared/errors/AppError';
import { InMemoryCarsRepository } from '../../repositories/in-memory/InMemoryCarsRepository';
import { InMemorySpecificationsRepository } from '../../repositories/in-memory/InMemorySpecificationsRepository';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;
let inMemorySpecificationsRepository: InMemorySpecificationsRepository;

describe('Create car speficification', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository,
    );
  });

  it('Shold not be able to add a new specification to a non-existent car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['4321'];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Shold be able to add a new specification to the car', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: '1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category_id',
    });

    const specifications_id = ['4321'];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
