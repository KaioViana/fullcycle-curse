import { Transaction } from "../domain/transaction";

interface IPaymentGateway {
  save(input: Transaction): Promise<Transaction>
}

export { IPaymentGateway };
