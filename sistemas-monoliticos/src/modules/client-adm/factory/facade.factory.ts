import { ClientFacade } from "../facade/client.facade";
import { IClientFacade } from "../facade/client.facade.interface";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";

class FacadeFactory {
  static create(): IClientFacade {
    const repository = new ClientRepository();
    const addUsecase = new AddClientUseCase(repository);
    const findUsecase = new FindClientUseCase(repository);
    const clientFacade = new ClientFacade(
      addUsecase,
      findUsecase,
    );

    return clientFacade;
  }
}

export { FacadeFactory }
