class InMemoryDatabaseContext<T> {
  static inMemoryData: any[] = [];

  async create(input: T): Promise<void> {
    InMemoryDatabaseContext.inMemoryData.push(input);
  }

  async findById(id: string): Promise<T | null> {
    const data = InMemoryDatabaseContext.inMemoryData.find(x => x.id.id === id);

    if (data) return data;

    return null;
  }

  async findAll(): Promise<T[]> {
    return InMemoryDatabaseContext.inMemoryData;
  }
}

export { InMemoryDatabaseContext };
