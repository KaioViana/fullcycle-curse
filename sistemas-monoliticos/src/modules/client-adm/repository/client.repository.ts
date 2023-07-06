import { ClientAdm } from "../domain/client.entity";
import { IClientGateway } from "../gateway/client.gateway";
import { IDatabaseContext } from "../infra/database/database.context.interface";

class ClientRepository implements IClientGateway {
  constructor(
    private readonly databaseContext: IDatabaseContext<ClientAdm>
  ) { }
  async add(client: ClientAdm): Promise<void> {
    await this.databaseContext.create(client);
  }

  async find(id: string): Promise<ClientAdm> {
    const client = await this.databaseContext.findById(id);

    if (!client) {
      throw new Error('Client not found')
    }

    return client;
  }
}

export { ClientRepository };
