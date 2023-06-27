import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { Transaction } from "../../domain/transaction";
import { IPaymentGateway } from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

class ProcessPaymentUseCase implements IUseCase {
  constructor(
    private readonly transactinRepository: IPaymentGateway,
  ) { }

  async execute(input?: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });

    transaction.procces();

    const persistTransaction = await this.transactinRepository.save(transaction);

    return {
      transactionId: persistTransaction.id.id,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: transaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    }
  }
}

export { ProcessPaymentUseCase }
