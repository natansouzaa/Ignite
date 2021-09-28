import { SpecificationRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationsController } from './CreateSpecificationsController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationRepository = new SpecificationRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository,
);
const createSpecificationController = new CreateSpecificationsController(
  createSpecificationUseCase,
);

export { createSpecificationController };
