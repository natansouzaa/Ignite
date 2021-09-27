import { Specification } from '../model/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository';

class SpecificationRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  list(): Specification[] {
    return this.specifications;
  }

  findByName(name: string): Specification {
    const specificationIfExists = this.specifications.find(
      specification => specification.name === name,
    );

    return specificationIfExists;
  }
}

export { SpecificationRepository };
