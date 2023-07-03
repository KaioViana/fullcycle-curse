import { IDatabase } from "../../../../@shared/infra/database/database.interface";
import { Transaction } from "../../../domain/transaction";
import { TransactionModel } from "./transaction.model";

class DatabaseOperation implements IDatabase<Transaction> {
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

  async findById(id: string): Promise<Transaction | null> {
    return null;
  }
}

export { DatabaseOperation };
