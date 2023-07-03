import { IDatabase } from "../../../../@shared/infra/database/database.interface";

interface IDatabaseOperation<T> extends IDatabase {
  create(input: T): Promise<void>;
  findById(id: string): Promise<T>;
}

export { IDatabaseOperation };
