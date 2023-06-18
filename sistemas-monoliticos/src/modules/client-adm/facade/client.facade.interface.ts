import { AddClientFacadeInputDto, FindClientFacadeOutputDto } from "./client.dto";

interface IClientFacade {
  add(input: AddClientFacadeInputDto): Promise<void>;
  find(id: string): Promise<FindClientFacadeOutputDto>;
}

export { IClientFacade }
