import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import { setupInMemorySequelize } from "../../../__tests__/utils/setup";
import CustomerModel from "../../db/sequelize/model/customer.model";
import { CustomerRepositorySequelize } from "./customer.repository.sequelize";

class MockCustomerRepository extends CustomerRepositorySequelize { }

describe("Customer Sequelize repository", () => {
  setupInMemorySequelize([CustomerModel]);

  it("should create a customer", async () => {
    const customerRepository = new MockCustomerRepository();
    const customer = new Customer("1", "Kaio");
    const address = new Address('Street 1', 1, 'zipcode 1', 'City 1')

    customer.Address = address;

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new MockCustomerRepository();
    const customer = new Customer('1', 'Kaio');
    const address = new Address('Street 1', 1, 'zipcode 1', 'City 1')

    customer.Address = address;

    await customerRepository.create(customer);

    const customerFound = await customerRepository.find("1");

    expect(customerFound).toStrictEqual(customer)
  });

  it("should find all customers", async () => {
    const customerRepository = new MockCustomerRepository();

    const customer1 = new Customer('1', 'Kaio1');
    const address1 = new Address('street1', 1, 'zip1', 'city 1');
    customer1.Address = address1;
    customer1.addRewardPoints(10);

    const customer2 = new Customer('2', 'Kaio2');
    const address2 = new Address('street2', 2, 'zip2', 'city2');
    customer2.Address = address2;
    customer2.addRewardPoints(15);

    [customer1, customer2].map(async (customer) =>
      customerRepository.create(customer));

    const customersFound = await customerRepository.findAll();

    expect(customersFound).toHaveLength(2);
    expect(customersFound).toContainEqual(customer1);
    expect(customersFound).toContainEqual(customer2);
  });

  it("should update a customer", async () => {
    // Arrange
    const customerRepository = new MockCustomerRepository();
    const customer = new Customer('1', 'Kaio');
    const address = new Address('street1', 1, 'zip1', 'city1');
    customer.Address = address;
    await customerRepository.create(customer);

    // Act
    const address2 = new Address('street2', 2, 'zip2', 'city2');
    customer.Address = address2;
    customer.addRewardPoints(10);
    await customerRepository.update(customer);

    // Assert
    const customerFound = await customerRepository.find('1');
    expect(customerFound).toStrictEqual(customer);
  });
});