import { Transaction } from "../domain/transaction";
import { PaymentFacade } from "../facade/payment.facade";
import { IPaymentFacade } from "../facade/payment.facade.interface";
import { DatabaseOperation } from "../infra/database/sequelize/database.operation";
import { DatabaseOperation as InMemoryDatabaseOperation } from '../../../__tests__/database/in-memory/database.operation';
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecase/process-payment/process-payment.usecase";

class FacadeFactory {
  static create(): IPaymentFacade {
    const sequelize = new DatabaseOperation();
    const repository = new TransactionRepository(sequelize);
    const processPaymentUsecase = new ProcessPaymentUseCase(repository);
    const paymentFacade = new PaymentFacade(
      processPaymentUsecase,
    );

    return paymentFacade;
  }
  static createMock(): IPaymentFacade {
    const inMemory = new InMemoryDatabaseOperation<Transaction>();
    const repository = new TransactionRepository(inMemory);
    const processPaymentUsecase = new ProcessPaymentUseCase(repository);
    const paymentFacade = new PaymentFacade(
      processPaymentUsecase,
    );

    return paymentFacade;
  }
}

export { FacadeFactory }
