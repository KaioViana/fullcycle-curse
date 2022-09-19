import { EventInterface } from '../@shared/event.interface';

class CustomerCreatedEvent implements EventInterface {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData
  }
}

export { CustomerCreatedEvent };

