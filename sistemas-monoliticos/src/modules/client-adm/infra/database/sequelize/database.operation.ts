import { Id } from "../../../../@shared/domain/value-object/id.value-object";
import { ClientAdm } from "../../../domain/client.entity";
import { ClientModel } from './client.model';
import { IDatabaseOperation } from "./database.operation.interface";

class DatabaseOperation implements IDatabaseOperation<ClientAdm> {
  async create(input: ClientAdm): Promise<void> {
    await ClientModel.create({
      id: input.id.id,
      name: input.name,
      email: input.email,
      address: input.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async findById(id: string): Promise<ClientAdm | null> {
    const client = await ClientModel.findOne({
      where: {
        id,
      }
    });

    if (client) {
      return new ClientAdm({
        id: new Id(client.id),
        name: client.name,
        email: client.email,
        address: client.address,
      });
    }

    return null;
  }
}

export { DatabaseOperation };
