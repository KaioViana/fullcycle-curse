import customer from "../../domain/entity/customer";
import { CustomerRepositorySequelize } from "./sequelize/customer.repository.sequelize";

export default class CustomerRepository extends CustomerRepositorySequelize {
  constructor() {
    super();
  }

  async create(entity: customer): Promise<void> {
    return super.create(entity);
  }

  async find(id: string): Promise<customer> {
    return super.find(id);
  }

  async findAll(): Promise<customer[]> {
    return super.findAll();
  }

  async update(entity: customer): Promise<void> {
    return super.update(entity);
  }
}