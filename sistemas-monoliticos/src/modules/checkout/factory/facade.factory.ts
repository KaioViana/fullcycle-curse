import { ICheckoutFacade } from "../facade/checkout.facade.interface";
import { DatabaseContext } from '../infra/database/sequelize/database.context';
import { InMemoryDatabaseContext } from '../../../__tests__/database/in-memory/database.context';
import { OrderRepository } from "../repository/order.repository";
import { PlaceOrderUseCase } from "../usecase/place-order/place-order.usecase";
import { FacadeFactory as ClientFacadeFactory } from '../../client-adm/factory/facade.factory';
import { ProductAdmFacadeFactory } from '../../product-adm/factory/facade.factory';
import { FacadeFactory as CatalogFacadeFactory } from '../../store-catalog/factory/facade.factory';
import { FacadeFactory as PaymentFacadeFactory } from '../../payments/factory/facade.factory';
import { FacadeFactory as InvoiceFacadeFactory } from '../../invoice/factory/facade.factory';
import { CheckoutFacade } from "../facade/checkout.facade";
import { OrderEntity } from "../domain/order.entity";
import { DatabaseConnection } from '../infra/database/sequelize/database.connection';

class FacadeFactory {
  static create(): ICheckoutFacade {
    DatabaseConnection.getConnectionInstance().sync();
    const databaseContext = new DatabaseContext();
    const repository = new OrderRepository(databaseContext);

    const clientFacade = ClientFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = CatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();

    const placeOrderUsecase = new PlaceOrderUseCase(
      clientFacade,
      productFacade,
      catalogFacade,
      paymentFacade,
      invoiceFacade,
      repository
    );

    const checkoutFacade = new CheckoutFacade(
      placeOrderUsecase
    );

    return checkoutFacade;
  }

  static createMock(): ICheckoutFacade {
    const inMemory = new InMemoryDatabaseContext<OrderEntity>();
    const repository = new OrderRepository(inMemory);

    const clientFacade = ClientFacadeFactory.createMock();
    const productFacade = ProductAdmFacadeFactory.createMock();
    const catalogFacade = CatalogFacadeFactory.createMock();
    const paymentFacade = PaymentFacadeFactory.createMock();
    const invoiceFacade = InvoiceFacadeFactory.createMock();

    const placeOrderUsecase = new PlaceOrderUseCase(
      clientFacade,
      productFacade,
      catalogFacade,
      paymentFacade,
      invoiceFacade,
      repository
    );

    const checkoutFacade = new CheckoutFacade(
      placeOrderUsecase
    );

    return checkoutFacade;
  }
}

export { FacadeFactory };
