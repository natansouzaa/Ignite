import { AppError } from '../../../../shared/errors/AppError';
import { InMemoryRentalsRepository } from '../../repositories/in-memory/InMemoryRentalsRepository';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalsRepository: InMemoryRentalsRepository;

describe('Create rental', () => {
  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalsRepository);
  });

  it('Shold be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Shold not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Shold not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'test',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '54321',
        car_id: 'test',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
