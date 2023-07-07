import { OrderEntity } from "../domain/order.entity";
import { ICheckoutGateway } from "../gateway/checkout.gateway";
import { IDatabaseContext } from "../infra/database/database.context.interface";

class OrderRepository implements ICheckoutGateway {
  constructor(
    private readonly databaseContext: IDatabaseContext<OrderEntity>
  ) { }
  async addOrder(order: OrderEntity): Promise<void> {
    await this.databaseContext.create(order);
  }

  async findOrder(id: string): Promise<OrderEntity> {
    return this.databaseContext.findById(id);
  }
}

export { OrderRepository };
