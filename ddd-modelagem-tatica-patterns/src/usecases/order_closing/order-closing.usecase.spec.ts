import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import { SendEmail } from "../../domain/event/order/handler/send-email.handler";
import OrderModel from "../../infrastructure/db/sequelize/model/order.model";
import { CustomerRepositorySequelize } from "../../infrastructure/repository/sequelize/customer.repository.sequelize";
import { OrderRepositorySequelize } from "../../infrastructure/repository/sequelize/order.repository.sequelize";
import { ProductRepositorySequelize } from "../../infrastructure/repository/sequelize/product.repository.sequelize";
import { setupInMemorySequelize } from "../../__tests__/utils/setup"
import { OrderClosingUseCase } from "./order-closing.usecase";

describe('Order use case', () => {
  setupInMemorySequelize();

  it('should execute with sequelize repository', async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const productRepository = new ProductRepositorySequelize();
    const orderRepository = new OrderRepositorySequelize();

    const spySendEmail = jest.spyOn(
      SendEmail.prototype,
      "handle"
    )

    const customer = new Customer('1', 'customer1');
    const address = new Address('street1', 1, 'zipcode1', 'city1');
    customer.Address = address;
    await customerRepository.create(customer);

    const product = new Product('1', 'product1', 100);
    await productRepository.create(product);

    const item = new OrderItem('1', product.name, product.price, product.id, 2);
    const order = new Order('1', customer.id, [item]);

    const orderClosingUseCase = new OrderClosingUseCase(orderRepository);

    await orderClosingUseCase.execute(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items']
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: order.total(),
      items: [
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          order_id: order.id,
          product_id: item.productId,
          total: item.total()
        }
      ]
    });
    expect(spySendEmail).toHaveBeenCalled();
    expect(spySendEmail).toHaveBeenCalledTimes(1);
  })
})
