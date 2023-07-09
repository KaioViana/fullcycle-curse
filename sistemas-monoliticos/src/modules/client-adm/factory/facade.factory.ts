import { ClientFacade } from "../facade/client.facade";
import { IClientFacade } from "../facade/client.facade.interface";
import { DatabaseContext } from "../infra/database/sequelize/database.context";
import { DatabaseConnection } from '../infra/database/sequelize/database.connection';
import { InMemoryDatabaseContext } from "../../../__tests__/database/in-memory/database.context";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";
import { ClientAdm } from "../domain/client.entity";

class FacadeFactory {
  static create(): IClientFacade {
    DatabaseConnection.getConnectionInstance().sync();
    const databaseContext = new DatabaseContext();
    const repository = new ClientRepository(databaseContext);
    const addUsecase = new AddClientUseCase(repository);
    const findUsecase = new FindClientUseCase(repository);
    const clientFacade = new ClientFacade(
      addUsecase,
      findUsecase,
    );

    return clientFacade;
  }

  static createMock(): IClientFacade {
    const inMemory = new InMemoryDatabaseContext<ClientAdm>();
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
