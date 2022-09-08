import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import { setupPrismaDatabase } from "../../../__tests__/utils/setup";
import { prismaClient } from "../../db/prisma/client/prismaClient";
import { CustomerRepositoryPrisma } from "./customer.repository.prisma";

describe('Customer prisma repository', () => {
  setupPrismaDatabase();
  const customerRepository = new CustomerRepositoryPrisma();

  it('should create a customer', async () => {
    const customer = new Customer('2', 'kaio1');
    const address = new Address('street1', 1, 'zip1', 'city1');

    customer.Address = address;

    await customerRepository.create(customer);

    const customerFound = await prismaClient.customer.findUnique({ where: { id: customer.id } });

    expect(customerFound).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints
    });
  });

  it('should find a customer', async () => {
    const customer = new Customer('1', 'customer');
    const address = new Address('street1', 1, 'zip1', 'city1');

    customer.Address = address;

    await customerRepository.create(customer);

    const customerFound = await customerRepository.find(customer.id);

    expect(customerFound).toStrictEqual(customer);
  });

  it('should find all customers', async () => {
    const customer1 = new Customer('1', 'customer1');
    const customer2 = new Customer('2', 'customer2');
    const address1 = new Address('street1', 1, 'zipcode1', 'city1');
    const address2 = new Address('street2', 2, 'zipcode2', 'city2');

    customer1.Address = address1;
    customer2.Address = address2;

    await Promise.all([customer1, customer2].map(async (customer: Customer) => await customerRepository.create(customer)));

    const customersFound = await customerRepository.findAll();

    expect(customersFound).toHaveLength(2);
  });

  it('should update a customer', async () => {
    // arrage
    const customer = new Customer('1', 'customer1');
    const address = new Address('street1', 1, 'zipcode1', 'city1');
    customer.Address = address;
    await customerRepository.create(customer);

    // act
    customer.changeName('kaio2');
    customer.addRewardPoints(10);
    await customerRepository.update(customer);

    //assert
    const customerFound = await customerRepository.find(customer.id);
    expect(customerFound.name).toEqual(customer.name);
    expect(customerFound.rewardPoints).toEqual(customer.rewardPoints);
  });
});
