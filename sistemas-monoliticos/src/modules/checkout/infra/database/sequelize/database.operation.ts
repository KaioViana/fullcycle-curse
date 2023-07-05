import { OrderEntity } from "../../../domain/order.entity";
import { IDatabaseOperation } from "./database.operation.interface";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

class DataBaseOperation implements IDatabaseOperation<OrderEntity> {
  async addOrder(input: OrderEntity): Promise<void> {
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

export { DataBaseOperation }
