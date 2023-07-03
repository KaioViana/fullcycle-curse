import { IDatabase } from "../../../modules/@shared/infra/database/database.interface";

class DatabaseOperation<T> implements IDatabase<T> {
  static inMemoryData: any[] = [];

  async create(input: T): Promise<void> {
    DatabaseOperation.inMemoryData.push(input);
  }

  async findById(id: string): Promise<T | null> {
    const data = DatabaseOperation.inMemoryData.find(x => x.id.id === id);

    if (data) return data;

    return null;
  }
}

export { DatabaseOperation };
