import { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClientFacadeOutputDto } from "./client.dto";

interface IClientFacade {
  add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto>;
  find(id: string): Promise<FindClientFacadeOutputDto>;
}

export { IClientFacade }
