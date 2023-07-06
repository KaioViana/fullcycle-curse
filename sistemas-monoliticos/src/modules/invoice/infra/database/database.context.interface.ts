interface IDatabaseContext<T> {
  create(input: T): Promise<void>;
  findById(id: string): Promise<T>;
}

export { IDatabaseContext };
