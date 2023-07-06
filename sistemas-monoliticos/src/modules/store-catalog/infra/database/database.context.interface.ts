interface IDatabaseContext<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}

export { IDatabaseContext };
