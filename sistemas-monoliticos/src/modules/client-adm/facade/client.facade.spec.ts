import { Id } from "../../@shared/domain/value-object/id.value-object";
import { FacadeFactory } from "../factory/facade.factory";
import { ClientModel } from "../infra/client.model";
import { DatabaseConnection } from "../infra/database.connection"

describe('client facade test', () => {
  beforeAll(async () => DatabaseConnection.sync());
  afterAll(async () => DatabaseConnection.closeConnection());

  it('should add client', async () => {
    const facade = FacadeFactory.create();
    const input = {
      name: 'client 1',
      email: 'email@example.com',
      address: 'address 1'
    }

    await facade.add(input);

    const client = await ClientModel.findOne({
      where: {
        name: 'client 1'
      }
    });
    expect(client).toBeDefined();
  });

  it('should find a client', async () => {
    const facade = FacadeFactory.create();
    const mockClientId = new Id();
    await ClientModel.create({
      id: mockClientId.id,
      name: 'name 1',
      email: 'email@example.com',
      address: 'address 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const client = await facade.find(mockClientId.id);

    expect(client).toBeDefined();
  });
});
