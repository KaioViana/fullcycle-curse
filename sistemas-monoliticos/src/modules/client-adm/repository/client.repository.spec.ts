import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ClientAdm } from "../domain/client.entity";
import { ClientModel } from "../infra/client.model";
import { DatabaseConnection } from "../../../__tests__/database.connection";
import { ClientRepository } from "./client.repository";
import { Sequelize } from "sequelize-typescript";

describe('Client repository test', () => {
  let databaseInstance: Sequelize;

  beforeEach(async () => {
    databaseInstance = DatabaseConnection.getConnectionInstance();
    databaseInstance.addModels([ClientModel]);
    ClientModel.initModel(databaseInstance);
    await databaseInstance.sync();
  });

  afterEach(async () => {
    await DatabaseConnection.closeConnection();
  });

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
