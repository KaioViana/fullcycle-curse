import { Id } from "../../@shared/domain/value-object/id.value-object";
import { FacadeFactory } from "../factory/facade.factory";
import { DatabaseOperation } from "../../../__tests__/database/in-memory/database.operation";
import { ClientAdm } from "../domain/client.entity";

describe('client facade test', () => {
  it('should add client', async () => {
    const facade = FacadeFactory.createMock();
    const input = {
      name: 'client 1',
      email: 'email@example.com',
      address: 'address 1'
    }

    const result = await facade.add(input);

    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.address).toBe(input.address);
  });

  it('should find a client', async () => {
    const facade = FacadeFactory.createMock();
    const mockClientId = new Id();
    const mockClient = new ClientAdm({
      id: mockClientId,
      name: 'name 1',
      email: 'email@example.com',
      address: 'address 1',
    });

    DatabaseOperation.inMemoryData.push(mockClient);

    const client = await facade.find(mockClientId.id);

    expect(client).toBeDefined();
  });
});
