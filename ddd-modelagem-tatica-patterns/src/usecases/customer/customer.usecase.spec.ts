import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../../infrastructure/db/sequelize/model/customer.model"
import { CustomerRepositorySequelize } from "../../infrastructure/repository/sequelize/customer.repository.sequelize";
import { setupInMemorySequelize } from "../../__tests__/utils/setup"
import { CustomerUseCase } from "./customer.usecase";

describe("Customer use case", () => {
  setupInMemorySequelize();

  it('should execute with sequelize repository', async () => {
    const customerRepositorySequelize = new CustomerRepositorySequelize();
    const customerUseCase = new CustomerUseCase(customerRepositorySequelize)
    const customer = new Customer('1', 'customer 1');
    const address = new Address('street 1', 1, 'zipcode1', 'city1');
    customer.Address = address;

    const result = await customerUseCase.execute(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: result.name,
      active: result.isActive(),
      rewardPoints: result.rewardPoints,
      street: result.address.street,
      number: result.address.number,
      zipcode: result.address.zip,
      city: result.address.city
    })
  });
}) 
