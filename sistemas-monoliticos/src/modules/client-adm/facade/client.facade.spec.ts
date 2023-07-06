import { Id } from "../../@shared/domain/value-object/id.value-object";
import { FacadeFactory } from "../factory/facade.factory";
import { InMemoryDatabaseContext } from "../../../__tests__/database/in-memory/database.context";
import { ClientAdm } from "../domain/client.entity";
import { Address } from "../../@shared/domain/value-object/address.value-object";

describe('client facade test', () => {
  it('should add client', async () => {
    const facade = FacadeFactory.createMock();
    const input = {
      name: 'client 1',
      email: 'email@example.com',
      document: 'document',
      address: {
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
      }
    };

    const result = await facade.add(input);

    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.address.street).toBe(input.address.street);
    expect(result.address.number).toBe(input.address.number);
    expect(result.address.complement).toBe(input.address.complement);
    expect(result.address.city).toBe(input.address.city);
    expect(result.address.state).toBe(input.address.state);
    expect(result.address.zipCode).toBe(input.address.zipCode);
  });

  it('should find a client', async () => {
    const facade = FacadeFactory.createMock();
    const mockClientId = new Id();
    const mockClient = new ClientAdm({
      id: mockClientId,
      name: 'name 1',
      email: 'email@example.com',
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

    InMemoryDatabaseContext.inMemoryData.push(mockClient);

    const client = await facade.find(mockClientId.id);

    expect(client).toBeDefined();
  });
});
