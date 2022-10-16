import { EventInterface } from "../../@shared/event/event.interface";

class OrderClosedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}

export { OrderClosedEvent }
