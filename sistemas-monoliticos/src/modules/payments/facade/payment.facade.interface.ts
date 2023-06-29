import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./payment.dto";

interface IPaymentFacade {
  processPayment(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto>
}

export { IPaymentFacade }
