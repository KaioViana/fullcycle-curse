import { IDatabase } from "../../../../@shared/infra/database/database.interface";

interface IDatabaseOperation<T> extends IDatabase {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}

export { IDatabaseOperation }
