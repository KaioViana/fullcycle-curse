import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../domain/transaction";
import { DatabaseConnection } from "../infra/database.connection";
import { TransactionRepository } from "./transaction.repository";

describe('Payment repository test', () => {
  beforeAll(async () => DatabaseConnection.sync());
  afterAll(async () => DatabaseConnection.closeConnection());
});
