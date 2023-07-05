import { OrderEntity } from "../domain/order.entity";

interface ICheckoutGateway {
  addOrder(order: OrderEntity): Promise<void>;
}

export { ICheckoutGateway };
