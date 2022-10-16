import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository.interface";
import Order from '../../domain/checkout/entity/order';
import { EventDispatcher } from "../../domain/@shared/event/event-dispatcher";
import { SendEmail } from "../../domain/checkout/event/handler/send-email.handler";
import { OrderClosedEvent } from "../../domain/checkout/event/order-closed.event";

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
