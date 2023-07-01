import { GenerateUseCase } from "./generate.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn(),
  }
}

describe('Generate usecase unit test', () => {
  it('should generate a invoice', async () => {
    const repository = MockRepository();
    const usecase = new GenerateUseCase(repository);
    const input = {
      name: 'name',
      document: 'document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
      items: [
        { id: '123', name: 'name', price: 100 }
      ]
    }

    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalledTimes(1);
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(100);
  });
});
