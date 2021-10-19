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
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: new Date(),
    });
  });
});
