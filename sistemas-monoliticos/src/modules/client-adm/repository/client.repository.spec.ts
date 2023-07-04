import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ClientAdm } from "../domain/client.entity";
import { DatabaseConnection } from "../../../__tests__/database.connection";
import { ClientRepository } from "./client.repository";
import { DatabaseOperation } from "../../../__tests__/database/in-memory/database.operation";
import { Address } from "../../@shared/domain/value-object/address.value-object";

describe('Client repository test', () => {

  afterEach(async () => {
    await DatabaseConnection.closeConnection();
  });

  it('Add client', async () => {
    const inMemory = new DatabaseOperation<ClientAdm>();
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
    const inMemory = new DatabaseOperation<ClientAdm>();
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
