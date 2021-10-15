import { InMemoryCarsRepository } from '../../repositories/in-memory/InMemoryCarsRepository';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let inMemoryCarsRepository: InMemoryCarsRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List cars', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      inMemoryCarsRepository,
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Shold be able tto list all available cars by brand', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car2',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'XXX-1234',
      fine_amount: 50,
      brand: 'Car brand test',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car brand test',
    });

    expect(cars).toEqual([car]);
  });

  it('Shold be able tto list all available cars by name', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car3',
      description: 'Car description',
      daily_rate: 120,
      license_plate: 'XXX-4321',
      fine_amount: 55,
      brand: 'Car brand test',
      category_id: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car3',
    });

    expect(cars).toEqual([car]);
  });

  it('Shold be able tto list all available cars by category', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Car4',
      description: 'Car description',
      daily_rate: 145,
      license_plate: 'XXX-4321',
      fine_amount: 75,
      brand: 'Car brand test',
      category_id: '12345',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345',
    });

    expect(cars).toEqual([car]);
  });
});
