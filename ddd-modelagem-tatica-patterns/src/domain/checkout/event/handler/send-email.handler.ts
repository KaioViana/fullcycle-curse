import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { OrderClosedEvent } from "../order-closed.event";

class SendEmail implements
  EventHandlerInterface<OrderClosedEvent> {
  handle(event: OrderClosedEvent): void {
    console.log('Disparando email de confirmação de pedido');
  }
}

export { SendEmail };
