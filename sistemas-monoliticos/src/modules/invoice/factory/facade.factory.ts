import { InvoiceFacade } from "../facade/invoice.facade";
import { IInvoiceFacade } from "../facade/invoice.facade.interface";
import { DatabaseOperation } from "../infra/database/sequelize/database.operation";
import { DatabaseOperation as InMemoryDatabaseOperation } from '../../../__tests__/database/in-memory/database.operation';
import { InvoiceRepository } from "../repository/invoice.repository";
import { FindUseCase } from "../usecase/find/find.usecase";
import { GenerateUseCase } from "../usecase/generate/generate.usecase";
import { InvoiceEntity } from "../domain/invoice.entity";

class FacadeFactory {
  static create(): IInvoiceFacade {
    const sequelize = new DatabaseOperation()
    const repository = new InvoiceRepository(sequelize);
    const generateUsecase = new GenerateUseCase(repository);
    const findUsecase = new FindUseCase(repository);

    const facade = new InvoiceFacade(
      generateUsecase,
      findUsecase
    );

    return facade;
  }

  static createMock(): IInvoiceFacade {
    const inMemory = new InMemoryDatabaseOperation<InvoiceEntity>();
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
