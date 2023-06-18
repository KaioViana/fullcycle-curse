import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { ClientAdm } from "../../domain/client.entity";
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
      address: client.address,
      createdAt: client.createAt,
      updatedAt: client.updatedAt,
    }
  }
}

export { FindClientUseCase }
