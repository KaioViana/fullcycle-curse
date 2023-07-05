import { IDatabase } from "../../../../@shared/infra/database/database.interface";

interface IDatabaseOperation<T> extends IDatabase {
  addOrder(input: T): Promise<void>;
}

export { IDatabaseOperation };
