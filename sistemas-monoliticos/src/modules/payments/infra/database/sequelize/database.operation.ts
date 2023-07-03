import { Transaction } from "../../../domain/transaction";
import { IDatabaseOperation } from "./database.operation.interface";
import { TransactionModel } from "./transaction.model";

class DatabaseOperation implements IDatabaseOperation<Transaction> {
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

export { DatabaseOperation };
