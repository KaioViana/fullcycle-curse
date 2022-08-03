import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe('Order service unit tests', () => {

  it('should place an order', () => {
    const customer = new Customer('1', 'Customer1');
    const item1 = new OrderItem('1', 'item1', 10, 'p1', 1)

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it('should get total of orders', () => {
    const orderItem1 = new OrderItem('1', 'item1', 100, 'p1', 1)
    const orderItem2 = new OrderItem('2', 'item2', 100, 'p2', 1)

    const order1 = new Order('1', '1', [orderItem1]);
    const order2 = new Order('2', '2', [orderItem2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(200);
  });
});