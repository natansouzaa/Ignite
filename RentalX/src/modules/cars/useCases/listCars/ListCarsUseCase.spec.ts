import { InMemoryCarsRepository } from '../../repositories/in-memory/InMemoryCarsRepository';
import { ListCarsUseCase } from './ListCarsUseCase';

let inMemoryCarsRepository: InMemoryCarsRepository;
let listCarsUseCase: ListCarsUseCase;

describe('List cars', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listCarsUseCase = new ListCarsUseCase(inMemoryCarsRepository);
  });

  it('Shold be able to list all available cars', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'XXX-1234',
      fine_amount: 50,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Shold be able tto list all available cars by name', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'XXX-1234',
      fine_amount: 50,
      brand: 'Car brand test',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Car brand test',
    });

    expect(cars).toEqual([car]);
  });
});
