import Order from "../../../domain/entity/order";
import OrderRepositoryInterface from "../../../domain/repository/order-repository.interface";
import OrderItemModel from "../../db/sequelize/model/order-item.model";
import OrderModel from "../../db/sequelize/model/order.model";

class OrderRepositorySequelize {
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
}

export { OrderRepositorySequelize }