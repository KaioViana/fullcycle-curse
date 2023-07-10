import { IInvoiceService } from "../../../interfaces/api-services/invoice-service.interface";
import { IInvoiceModule } from "../../../interfaces/modules/invoice-module.interface";
import { findInvoiceInputDto, findInvoiceOutputDto } from "../../dto/invoce.service.dto";

class InvoiceService implements IInvoiceService {
  constructor(
    private readonly invoiceModule: IInvoiceModule,
  ) { }
  async get(input: findInvoiceInputDto): Promise<findInvoiceOutputDto> {
    try {
      return await this.invoiceModule.find(input);
    } catch (err) {
      throw new Error('Error while get invoice');
    }
  }
}

export { InvoiceService };
