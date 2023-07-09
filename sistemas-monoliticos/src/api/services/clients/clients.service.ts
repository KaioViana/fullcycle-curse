import { IClientModule } from "../../../interfaces/modules/client-module.interface";
import { createClientInputDto, createClientOutputDto } from "../../dto/clients.service.dto";
import { IClientsService } from '../../../interfaces/api-services/clients-service.interface';

class ClientsService implements IClientsService {
  constructor(
    private readonly clientModule: IClientModule,
  ) { }

  async create(input: createClientInputDto): Promise<createClientOutputDto> {
    try {
      return await this.clientModule.add(input);
    } catch (err) {
      throw new Error('Error while create client');
    }
  }
}

export { ClientsService };
