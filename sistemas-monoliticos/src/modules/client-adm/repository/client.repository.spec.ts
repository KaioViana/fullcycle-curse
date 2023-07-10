import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ClientAdm } from "../domain/client.entity";
import { ClientRepository } from "./client.repository";
import { InMemoryDatabaseContext } from "../../../__tests__/database/in-memory/database.context";
import { Address } from "../../@shared/domain/value-object/address.value-object";

describe('Client repository test', () => {
  it('Add client', async () => {
    const inMemory = new InMemoryDatabaseContext<ClientAdm>();
    const repository = new ClientRepository(inMemory);
    const mockClientId = new Id();
    const mockClient = new ClientAdm({
      id: mockClientId,
      name: 'Client 1',
      email: 'client@example.com',
      document: 'document',
      address: new Address({
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
      })
    });
    await repository.add(mockClient);

    const client = await inMemory.findById(mockClientId.id);

    expect(client).toBeDefined();
    expect(client.id.id).toEqual(mockClientId.id);
  });

  it('find a client', async () => {
    const inMemory = new InMemoryDatabaseContext<ClientAdm>();
    const repository = new ClientRepository(inMemory);
    const mockClientId = new Id();
    const mockClient = new ClientAdm({
      id: mockClientId,
      name: 'Client 1',
      email: 'client@example.com',
      document: 'document',
      address: new Address({
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
      })
    });

    await inMemory.create(mockClient);

    const client = await repository.find(mockClientId.id);
    expect(client).toBeDefined()
    expect(client.id.id).toEqual(mockClientId.id);
  });
});
