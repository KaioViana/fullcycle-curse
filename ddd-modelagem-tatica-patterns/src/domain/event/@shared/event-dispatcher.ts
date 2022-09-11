import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

type EventHandlersType = {
  [eventName: string]: EventHandlerInterface[]
}

class EventDispatcher implements EventDispatcherInterface {
  private _eventHandlers: EventHandlersType = {}

  get getEventHandlers(): EventHandlersType {
    return this._eventHandlers;
  }

  notify(event: EventInterface): void {

  }

  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = []
    }
    this._eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (this._eventHandlers[eventName]) {
      const index = this._eventHandlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this._eventHandlers[eventName].splice(index, 1);
      }
    }
  }

  unregisterAll(): void {
    this._eventHandlers = {};
  }
}

export { EventDispatcher };

