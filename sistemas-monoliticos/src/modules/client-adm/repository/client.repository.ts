import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ClientAdm } from "../domain/client.entity";
import { IClientGateway } from "../gateway/client.gateway";
import { ClientModel } from "../infra/client.model";

class ClientRepository implements IClientGateway {
  async add(client: ClientAdm): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async find(id: string): Promise<ClientAdm> {
    const client = await ClientModel.findOne({
      where: {
        id
      }
    });

    if (!client) {
      throw new Error('Client not found')
    }

    return new ClientAdm({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address
    });
  }
}

export { ClientRepository };
