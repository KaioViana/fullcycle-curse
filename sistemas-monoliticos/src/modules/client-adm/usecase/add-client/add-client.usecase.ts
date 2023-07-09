import { Address } from "../../../@shared/domain/value-object/address.value-object";
import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { ClientAdm } from "../../domain/client.entity";
import { IClientGateway } from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

class AddClientUseCase implements IUseCase {
  constructor(
    private readonly clientRepository: IClientGateway
  ) { }

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      name: input.name,
      email: input.email,
      document: input.document,
      address: new Address({
        street: input.address.street,
        number: input.address.number,
        complement: input.address.complement,
        city: input.address.city,
        state: input.address.state,
        zipCode: input.address.zipCode,
      }),
    }

    const client = new ClientAdm(props);
    await this.clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: {
        street: client.address.street,
        number: client.address.number,
        complement: client.address.complement,
        city: client.address.city,
        state: client.address.state,
        zipCode: client.address.zipCode,
      },
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}

export { AddClientUseCase }
