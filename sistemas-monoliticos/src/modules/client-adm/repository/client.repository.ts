import { IDatabase } from "../../@shared/infra/database/database.interface";
import { ClientAdm } from "../domain/client.entity";
import { IClientGateway } from "../gateway/client.gateway";

class ClientRepository implements IClientGateway {
  constructor(
    private readonly databaseOperation: IDatabase<ClientAdm>
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
