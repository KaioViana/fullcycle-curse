import { OrderEntity } from "../domain/order.entity";
import { ICheckoutGateway } from "../gateway/checkout.gateway";
import { IDatabaseContext } from "../infra/database/database.context.interface";

class OrderRepository implements ICheckoutGateway {
  constructor(
    private readonly databaseOperation: IDatabaseContext<OrderEntity>
  ) { }
  async addOrder(order: OrderEntity): Promise<void> {
    await this.databaseOperation.create(order);
  }
}

export { OrderRepository };
