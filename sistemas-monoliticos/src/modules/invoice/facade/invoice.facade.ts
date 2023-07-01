import { FindUseCase } from "../usecase/find/find.usecase";
import { GenerateUseCase } from "../usecase/generate/generate.usecase";
import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.dto";
import { IInvoiceFacade } from "./invoice.facade.interface";

class InvoiceFacade implements IInvoiceFacade {
  constructor(
    private readonly generateUsecase: GenerateUseCase,
    private readonly findUsecase: FindUseCase,
  ) { }
  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return this.generateUsecase.execute(input);
  }

  async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return this.findUsecase.execute(input);
  }
}

export { InvoiceFacade };
