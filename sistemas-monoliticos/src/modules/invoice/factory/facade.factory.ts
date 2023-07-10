import { InvoiceFacade } from "../facade/invoice.facade";
import { IInvoiceFacade } from "../facade/invoice.facade.interface";
import { DatabaseContext } from "../infra/database/sequelize/database.context";
import { InMemoryDatabaseContext } from '../../../__tests__/database/in-memory/database.context';
import { InvoiceRepository } from "../repository/invoice.repository";
import { FindUseCase } from "../usecase/find/find.usecase";
import { GenerateUseCase } from "../usecase/generate/generate.usecase";
import { InvoiceEntity } from "../domain/invoice.entity";
import { DatabaseConnection } from "../infra/database/sequelize/database.connection";

class FacadeFactory {
  static create(): IInvoiceFacade {
    DatabaseConnection.getConnectionInstance().sync();
    const databaseContext = new DatabaseContext()
    const repository = new InvoiceRepository(databaseContext);
    const generateUsecase = new GenerateUseCase(repository);
    const findUsecase = new FindUseCase(repository);

    const facade = new InvoiceFacade(
      generateUsecase,
      findUsecase
    );

    return facade;
  }

  static createMock(): IInvoiceFacade {
    const inMemory = new InMemoryDatabaseContext<InvoiceEntity>();
    const repository = new InvoiceRepository(inMemory);
    const generateUsecase = new GenerateUseCase(repository);
    const findUsecase = new FindUseCase(repository);

    const facade = new InvoiceFacade(
      generateUsecase,
      findUsecase
    );

    return facade;
  }
}

export { FacadeFactory };
