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
    await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description car',
      daily_rate: 100,
      license_plate: '1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'Category_id',
    });
  });
});
