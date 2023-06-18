import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { AddClientUseCase } from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
};

describe('Add client usecase unit test', () => {
  it('should add a client', async () => {
    const mockClientId = new Id();
    const mockRepository = MockRepository();
    const usecase = new AddClientUseCase(mockRepository);

    const input = {
      id: mockClientId.id,
      name: 'Cliente 1',
      email: 'client@test.com',
      address: 'Address 1'
    };

    await usecase.execute(input);
    expect(mockRepository.add).toHaveBeenCalledTimes(1);

  });
});
