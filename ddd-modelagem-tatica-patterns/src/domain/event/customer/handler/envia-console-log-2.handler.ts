import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

class EnviaConsoleLog2Handler implements
  EventHandlerInterface<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreatedEvent');
  }
}

export { EnviaConsoleLog2Handler };

