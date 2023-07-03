import { ClientFacade } from "../facade/client.facade";
import { IClientFacade } from "../facade/client.facade.interface";
import { DatabaseOperation } from "../infra/database/sequelize/database.operation";
import { DatabaseOperation as InMemoryDatabaseOperation } from "../../../__tests__/database/in-memory/database.operation";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";
import { ClientAdm } from "../domain/client.entity";

class FacadeFactory {
  static create(): IClientFacade {
    const sequelize = new DatabaseOperation();
    const repository = new ClientRepository(sequelize);
    const addUsecase = new AddClientUseCase(repository);
    const findUsecase = new FindClientUseCase(repository);
    const clientFacade = new ClientFacade(
      addUsecase,
      findUsecase,
    );

    return clientFacade;
  }

  static createMock(): IClientFacade {
    const inMemory = new InMemoryDatabaseOperation<ClientAdm>();
    const repository = new ClientRepository(inMemory);
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
