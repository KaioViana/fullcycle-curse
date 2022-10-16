import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "../../db/sequelize/model/customer.model";

class CustomerRepositorySequelize implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    });
  }

  async find(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );

      customer.Address = address;
      customer.addRewardPoints(customerModel.rewardPoints);

      return customer;
    } catch (err) {
      throw new Error('Customer not found');
    }
  }

  async findAll(): Promise<Customer[]> {
    const customersModel = await CustomerModel.findAll();
    return customersModel.map(customerModel => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );

      customer.Address = address;
      customer.addRewardPoints(customerModel.rewardPoints);
      return customer
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive(),
      rewardPoints: 10
    }, {
      where: {
        id: entity.id
      }
    });
  }
}

export { CustomerRepositorySequelize }
