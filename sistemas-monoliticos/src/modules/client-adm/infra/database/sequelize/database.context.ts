import { Address } from "../../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../../@shared/domain/value-object/id.value-object";
import { ClientAdm } from "../../../domain/client.entity";
import { ClientModel } from './client.model';
import { IDatabaseContext } from "../database.context.interface";

class DatabaseContext implements IDatabaseContext<ClientAdm> {
  async create(input: ClientAdm): Promise<void> {
    await ClientModel.create({
      id: input.id.id,
      name: input.name,
      email: input.email,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,
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
        document: client.document,
        address: new Address({
          street: client.street,
          number: client.number,
          complement: client.complement,
          city: client.city,
          state: client.state,
          zipCode: client.zipCode,
        }),
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      });
    }

    return null;
  }
}

export { DatabaseContext };
