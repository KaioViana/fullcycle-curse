import { Address } from "../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { ClientAdm } from "../../domain/client.entity";
import { FindClientUseCase } from "./find-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe('Find cliente usecase unit test', () => {
  it('should find a client', async () => {
    const repository = MockRepository();
    const usecase = new FindClientUseCase(repository);
    const mockClientId = new Id();
    const mockClient = new ClientAdm({
      id: mockClientId,
      name: 'Cliente 1',
      email: 'client@test.com',
      document: 'document',
      address: new Address({
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
      }),
    });

    repository.find.mockResolvedValue(mockClient);
    await usecase.execute({ id: mockClientId.id });
    expect(repository.find).toHaveBeenCalledTimes(1);
  });
});
