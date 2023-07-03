import { ClientAdm } from "../domain/client.entity";
import { IClientGateway } from "../gateway/client.gateway";
import { IDatabaseOperation } from "../infra/database/sequelize/database.operation.interface";

class ClientRepository implements IClientGateway {
  constructor(
    private readonly databaseOperation: IDatabaseOperation<ClientAdm>
  ) { }
  async add(client: ClientAdm): Promise<void> {
    await this.databaseOperation.create(client);
  }

  async find(id: string): Promise<ClientAdm> {
    const client = await this.databaseOperation.findById(id);

    if (!client) {
      throw new Error('Client not found')
    }

    return client;
  }
}

export { ClientRepository };
