import { OrderEntity } from "../domain/order.entity";

interface ICheckoutGateway {
  addOrder(order: OrderEntity): Promise<void>;
  findOrder(id: string): Promise<OrderEntity | null>;
}

export { ICheckoutGateway };
