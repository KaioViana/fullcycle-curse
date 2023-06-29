import { PaymentFacade } from "../facade/payment.facade";
import { IPaymentFacade } from "../facade/payment.facade.interface";
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecase/process-payment/process-payment.usecase";

class FacadeFactory {
  static create(): IPaymentFacade {
    const repository = new TransactionRepository();
    const processPaymentUsecase = new ProcessPaymentUseCase(repository);
    const paymentFacade = new PaymentFacade(
      processPaymentUsecase,
    );

    return paymentFacade;
  }
}

export { FacadeFactory }
