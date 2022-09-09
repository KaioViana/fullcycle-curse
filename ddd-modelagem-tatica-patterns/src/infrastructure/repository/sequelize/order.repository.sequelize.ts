import Order from "../../../domain/entity/order";
import OrderRepositoryInterface from "../../../domain/repository/order-repository.interface";
import OrderItemModel from "../../db/sequelize/model/order-item.model";
import OrderModel from "../../db/sequelize/model/order.model";

class OrderRepositorySequelize implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        total: item.total()
      }))

    }, {
      include: [{ model: OrderItemModel }]
    })
  }

  async find(id: string): Promise<Order> {
    const orderFound = await OrderModel.findOne({
      where: { id },
      include: ["items"]
    });

    if (!orderFound) throw new Error('Order not found');

    const order = {
      id: orderFound.id,
      customerId: orderFound.customer_id,
      total: orderFound.total,
      items: orderFound.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.product_id,
        quantity: item.quantity,
        total: item.total
      })),
    }

    return order as unknown as Order;
  }

  async findAll(): Promise<Order[]> {
    const ordersFound = await OrderModel.findAll();

    return ordersFound.map((order) => ({
      id: order.id,
      customerId: order.customer_id,
      total: order.total,
      items: order.items?.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.product_id,
        quantity: item.quantity,
        total: item.total
      })),
    })) as unknown as Order[]

  }

  async update(entity: Order): Promise<void> {

  }
}

export { OrderRepositorySequelize }
