import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";
import { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClientFacadeOutputDto } from "./client.dto";
import { IClientFacade } from "./client.facade.interface";

class ClientFacade implements IClientFacade {
  constructor(
    private readonly addClientUsecase: AddClientUseCase,
    private readonly findClientUsecase: FindClientUseCase,
  ) { }
  async add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
    return await this.addClientUsecase.execute(input);
  }
  async find(id: string): Promise<FindClientFacadeOutputDto> {
    return this.findClientUsecase.execute({ id });
  }
}

export { ClientFacade };
