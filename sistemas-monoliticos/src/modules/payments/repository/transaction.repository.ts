import { IDatabase } from "../../@shared/infra/database/database.interface";
import { Transaction } from "../domain/transaction";
import { IPaymentGateway } from "../gateway/payment.gateway";

class TransactionRepository implements IPaymentGateway {
  constructor(
    private readonly databaseOperation: IDatabase<Transaction>
  ) { }
  async save(input: Transaction): Promise<Transaction> {
    await this.databaseOperation.create(input);
    return input;
  }
}

export { TransactionRepository }
