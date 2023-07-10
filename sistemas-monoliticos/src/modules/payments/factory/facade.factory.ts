import { Transaction } from "../domain/transaction";
import { PaymentFacade } from "../facade/payment.facade";
import { IPaymentFacade } from "../facade/payment.facade.interface";
import { DatabaseContext } from "../infra/database/sequelize/database.context";
import { InMemoryDatabaseContext } from '../../../__tests__/database/in-memory/database.context';
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecase/process-payment/process-payment.usecase";
import { DatabaseConnection } from "../infra/database/sequelize/database.connection";

class FacadeFactory {
  static create(): IPaymentFacade {
    DatabaseConnection.getConnectionInstance().sync();
    const databaseContext = new DatabaseContext();
    const repository = new TransactionRepository(databaseContext);
    const processPaymentUsecase = new ProcessPaymentUseCase(repository);
    const paymentFacade = new PaymentFacade(
      processPaymentUsecase,
    );

    return paymentFacade;
  }
  static createMock(): IPaymentFacade {
    const inMemory = new InMemoryDatabaseContext<Transaction>();
    const repository = new TransactionRepository(inMemory);
    const processPaymentUsecase = new ProcessPaymentUseCase(repository);
    const paymentFacade = new PaymentFacade(
      processPaymentUsecase,
    );

    return paymentFacade;
  }
}

export { FacadeFactory }
