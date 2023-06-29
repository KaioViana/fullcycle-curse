import { ProcessPaymentUseCase } from "../usecase/process-payment/process-payment.usecase";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./payment.dto";
import { IPaymentFacade } from "./payment.facade.interface";

class PaymentFacade implements IPaymentFacade {
  constructor(
    private readonly processPaymentUsecase: ProcessPaymentUseCase,
  ) { }

  async processPayment(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    return this.processPaymentUsecase.execute(input);
  }
}

export { PaymentFacade }
