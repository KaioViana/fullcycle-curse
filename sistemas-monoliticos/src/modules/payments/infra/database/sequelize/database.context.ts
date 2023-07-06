import { Transaction } from "../../../domain/transaction";
import { IDatabaseContext } from "../database.context.interface";
import { TransactionModel } from "./transaction.model";

class DatabaseContext implements IDatabaseContext<Transaction> {
  async create(input: Transaction): Promise<void> {
    await TransactionModel.create({
      id: input.id.id,
      orderId: input.orderId,
      amount: input.amount,
      status: input.status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export { DatabaseContext };
