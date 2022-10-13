import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from '../../domain/entity/order';
import { EventDispatcher } from "../../domain/event/@shared/event-dispatcher";
import { SendEmail } from "../../domain/event/order/handler/send-email.handler";
import { OrderClosedEvent } from "../../domain/event/order/order-closed.event";

class OrderClosingUseCase {
  constructor(private orderRepository: OrderRepositoryInterface) { }

  async execute(entity: Order): Promise<Order> {
    try {
      const eventDispatcher = new EventDispatcher();
      const sendEmail = new SendEmail();
      const orderClosedEvent = new OrderClosedEvent({
        total: entity.total(),
        items: entity.items,
        customerId: entity.customerId,
      })
      eventDispatcher.register(orderClosedEvent.constructor.name, sendEmail);

      await this._create(entity);
      eventDispatcher.notify(orderClosedEvent);

      return entity;
    } catch (err) {
      console.log(err);
      throw new Error('Error to closing order')
    }
  }

  private _create(order: Order) {
    return this.orderRepository.create(order);
  }

}

export { OrderClosingUseCase }
