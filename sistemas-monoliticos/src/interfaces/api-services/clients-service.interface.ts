import { createClientInputDto, createClientOutputDto } from "../../api/dto/clients.service.dto";

interface IClientsService {
  create(input: createClientInputDto): Promise<createClientOutputDto>;
}

export { IClientsService };
