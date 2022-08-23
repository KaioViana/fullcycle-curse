import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";
import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order_item";
import Product from "../../../domain/entity/product";
import { setupInMemorySequelize } from "../../../__tests__/utils/setup"
import CustomerModel from "../../db/sequelize/model/customer.model";
import OrderItemModel from "../../db/sequelize/model/order-item.model";
import OrderModel from "../../db/sequelize/model/order.model";
import ProductModel from "../../db/sequelize/model/product.model";
import { CustomerRepositorySequelize } from './customer.repository.sequelize'
import { OrderRepositorySequelize } from "./order.repository.sequelize";
import { ProductRepositorySequelize } from "./product.repository.sequelize";

describe('Order Sequelize repository', () => {
  setupInMemorySequelize([CustomerModel, OrderModel, OrderItemModel, ProductModel]);

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepositorySequelize();
    const productRepository = new ProductRepositorySequelize();
    const orderRepository = new OrderRepositorySequelize();

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
});
