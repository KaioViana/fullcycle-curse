import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order_item";
import Product from "../../../domain/entity/product";
import { setupInMemorySequelize } from "../../../__tests__/utils/setup"
import OrderModel from "../../db/sequelize/model/order.model";
import { CustomerRepositorySequelize } from './customer.repository.sequelize'
import { OrderRepositorySequelize } from "./order.repository.sequelize";
import { ProductRepositorySequelize } from "./product.repository.sequelize";

describe('Order Sequelize repository', () => {
  setupInMemorySequelize();
  const customerRepository = new CustomerRepositorySequelize();
  const productRepository = new ProductRepositorySequelize();
  const orderRepository = new OrderRepositorySequelize();

  it('should create a new order', async () => {
    const customer = new Customer('1', 'customer1')
    const address = new Address('street1', 1, 'zipcode1', 'city1');
    customer.Address = address;
    await customerRepository.create(customer);

    const product = new Product('1', 'product1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderFound = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"]
    });

    expect(orderFound.toJSON()).toStrictEqual({
      id: '1',
      customer_id: '1',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: orderItem.productId,
          total: orderItem.total()

        }
      ]
    });
  });

  it('should find a order', async () => {
    const customer = new Customer('2', 'customer1')
    const address = new Address('street1', 1, 'zipcode1', 'city1');
    customer.Address = address;
    await customerRepository.create(customer);

    const product = new Product('2', 'product1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem('2', product.name, product.price, product.id, 2);
    const order = new Order('2', customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderFound = await orderRepository.find(order.id);

    expect(orderFound).toStrictEqual({
      id: order.id,
      customerId: order.customerId,
      total: order.total(),
      items: order.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        total: item.total()
      }))
    });
  });

  it('should find all orders', async () => {
    const customer = new Customer('2', 'customer1')
    const address = new Address('street1', 1, 'zipcode1', 'city1');
    customer.Address = address;
    await customerRepository.create(customer);

    const product = new Product('2', 'product1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem('2', product.name, product.price, product.id, 2);
    const order = new Order('2', customer.id, [orderItem]);
    await orderRepository.create(order);

    const customer2 = new Customer('3', 'customer1')
    const address2 = new Address('street2', 1, 'zipcode1', 'city1');
    customer2.Address = address2;
    await customerRepository.create(customer2);

    const product2 = new Product('3', 'product1', 100);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem('3', product2.name, product2.price, product2.id, 2);
    const order2 = new Order('3', customer2.id, [orderItem2]);
    await orderRepository.create(order2);

    const ordersFound = await orderRepository.findAll();

    expect(ordersFound).toHaveLength(2);
  });

  it('should update a order', async () => {
    const customer = new Customer('1', 'customer1')
    const address = new Address('street1', 1, 'zipcode1', 'city1');
    customer.Address = address;
    await customerRepository.create(customer);

    const product = new Product('1', 'product1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem('1', product.name, product.price, product.id, 2);
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepository.create(order);

    order.addOrderItem(new OrderItem('2', product.name, product.price, product.id, 1));

    await orderRepository.update(order);


    const orderFound = await orderRepository.find(order.id);

    expect(orderFound.total).toBe(300);
    expect(orderFound.items).toHaveLength(2);
  })
});
