import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { prismaClient } from "../../db/prisma/client/prismaClient";

class CustomerRepositoryPrisma implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await prismaClient.customer.create({
      data: {
        id: entity.id,
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints
      }
    })
  }

  async find(id: string): Promise<Customer> {
    const customerFound = await prismaClient.customer.findUnique({ where: { id } });

    if (!customerFound) throw new Error('Customer not found');

    const customer = new Customer(customerFound.id, customerFound.name);
    const address = new Address(customerFound.street, customerFound.number, customerFound.zipcode, customerFound.city);

    customer.Address = address;
    customer.addRewardPoints(customerFound.rewardPoints);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customersFound = await prismaClient.customer.findMany({});
    return customersFound.map((item: any) => {
      const customer = new Customer(item.id, item.name);
      const address = new Address(item.street, item.number, item.zipcode, item.city);
      customer.Address = address;

      return customer;

    })
  }

  async update(entity: Customer): Promise<void> {
    await prismaClient.customer.update({
      where: { id: entity.id },
      data: {
        id: entity.id,
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints
      }
    })
  }
}

export { CustomerRepositoryPrisma }
