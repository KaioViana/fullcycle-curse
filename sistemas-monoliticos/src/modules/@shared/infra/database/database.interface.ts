interface IDatabase<T> {
  create(input: T): Promise<void>;
  findById(id: string): Promise<T | null>;
}

export { IDatabase };
