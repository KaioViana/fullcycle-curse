import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ClientAdm } from "../domain/client.entity";
import { ClientModel } from "../infra/client.model";
import { DatabaseConnection } from "../infra/database.connection";
import { ClientRepository } from "./client.repository";

describe('Client repository test', () => {
  beforeAll(async () => DatabaseConnection.sync());
  afterAll(async () => DatabaseConnection.closeConnection());

  it('Add client', async () => {
    const repository = new ClientRepository();
    const mockClientId = new Id();
    const mockClient = new ClientAdm({
      id: mockClientId,
      name: 'Client 1',
      email: 'client@example.com',
      address: 'address 1',
    });
    await repository.add(mockClient);

    const client = await ClientModel.findOne({
      where: {
        id: mockClientId.id
      }
    });

    expect(client).toBeDefined();
    expect(client.id).toEqual(mockClientId.id);

  });

  it('find a client', async () => {
    const repository = new ClientRepository();
    const mockClientId = new Id();
    const mockClient = new ClientAdm({
      id: mockClientId,
      name: 'Client 1',
      email: 'client@example.com',
      address: 'address 1',
    });

    await ClientModel.create({
      id: mockClient.id.id,
      name: mockClient.name,
      email: mockClient.email,
      address: mockClient.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const client = await repository.find(mockClientId.id);
    expect(client).toBeDefined()
    expect(client.id.id).toEqual(mockClientId.id);
  });
});
