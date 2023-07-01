import { InvoiceFacade } from "../facade/invoice.facade";
import { IInvoiceFacade } from "../facade/invoice.facade.interface";
import { InvoiceRepository } from "../repository/invoice.repository";
import { FindUseCase } from "../usecase/find/find.usecase";
import { GenerateUseCase } from "../usecase/generate/generate.usecase";

class FacadeFactory {
  static create(): IInvoiceFacade {
    const repository = new InvoiceRepository();
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
