import { CustomerCreatedEvent } from "../customer/customer-created.event";
import { EnviaConsoleLog1Handler } from "../customer/handler/envia-console-log-1.handler";
import { EnviaConsoleLog2Handler } from "../customer/handler/envia-console-log-2.handler";
import { SendEmailWhenProductCreatedHandler } from "../product/handler/send-email-when-product-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe('Domain events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toHaveLength(0);
  });

  it('should unregister all events', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    // handlers
    const sendEmailWhenProductCreatedHandlerEventHandler = new SendEmailWhenProductCreatedHandler();
    const enviaConsoleLog1HandlerEventHandler = new EnviaConsoleLog1Handler();
    const enviaConsoleLog2HandlerEventHandler = new EnviaConsoleLog2Handler();

    // handlers spy
    const spySendEmailWhenProductCreatedHandlerEventHandler = jest.spyOn(
      sendEmailWhenProductCreatedHandlerEventHandler,
      "handle"
    );
    const spyEnviaConsoleLog1Handler = jest.spyOn(
      enviaConsoleLog1HandlerEventHandler,
      "handle"
    );
    const spyEnviaConsoleLog2Handler = jest.spyOn(
      enviaConsoleLog2HandlerEventHandler,
      "handle"
    );

    // registra eventos
    eventDispatcher.register('ProductCreatedEvent', sendEmailWhenProductCreatedHandlerEventHandler);
    eventDispatcher.register('CustomerCreatedEvent', enviaConsoleLog1HandlerEventHandler);
    eventDispatcher.register('CustomerCreatedEvent', enviaConsoleLog2HandlerEventHandler);

    // cria eventos
    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product1",
      description: "Product 1 description",
      price: 10.0,
    });
    const customerCreatedEvent = new CustomerCreatedEvent({
      name: 'Customer1',
      description: 'Customer event description',
      active: true
    });

    // Quando o notify for executado os handlers devem ser executados
    eventDispatcher.notify(productCreatedEvent);
    eventDispatcher.notify(customerCreatedEvent);

    expect(spySendEmailWhenProductCreatedHandlerEventHandler).toHaveBeenCalled();
    expect(spyEnviaConsoleLog1Handler).toHaveBeenCalled();
    expect(spyEnviaConsoleLog2Handler).toHaveBeenCalled();
  });
});
