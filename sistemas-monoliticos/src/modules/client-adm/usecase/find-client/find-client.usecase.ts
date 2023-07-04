import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { IClientGateway } from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

class FindClientUseCase implements IUseCase {
  constructor(
    private readonly clientRepository: IClientGateway
  ) { }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const client = await this.clientRepository.find(input.id);
    if (!client) {
      throw new Error('Client not found');
    }

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

export { FindClientUseCase }
