import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";

class CustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) { }

  async execute(entity: Customer): Promise<Customer> {
    try {
      this._create(entity);
      return entity;
    } catch (err) {
      throw new Error('Error to handle customer entity');
    }
  }

  private _create(entity: Customer) {
    return this.customerRepository.create(entity);
  }
}

export { CustomerUseCase };
