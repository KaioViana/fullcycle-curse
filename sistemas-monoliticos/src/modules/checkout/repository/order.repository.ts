import { OrderEntity } from "../domain/order.entity";
import { ICheckoutGateway } from "../gateway/checkout.gateway";
import { IDatabaseOperation } from "../infra/database/sequelize/database.operation.interface";

class OrderRepository implements ICheckoutGateway {
  constructor(
    private readonly databaseOperation: IDatabaseOperation<OrderEntity>
  ) { }
  async addOrder(order: OrderEntity): Promise<void> {
    await this.databaseOperation.create(order);
  }
}

export { OrderRepository };
