interface IDatabaseContext<T> {
  create(input: T): Promise<void>;
}

export { IDatabaseContext };
