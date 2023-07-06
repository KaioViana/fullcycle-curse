import { OrderEntity } from "../../../domain/order.entity";
import { IDatabaseContext } from "../database.context.interface";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

class DatabaseContext implements IDatabaseContext<OrderEntity> {
  async create(input: OrderEntity): Promise<void> {
    await OrderModel.create({
      id: input.id.id,
      clientId: input.client.id.id,
      status: input.status,
      total: input.total,
      items: input.products.map(product => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      }))
    }, {
      include: [
        { model: ProductModel, as: 'items' }
      ]
    })
  }
}

export { DatabaseContext }
