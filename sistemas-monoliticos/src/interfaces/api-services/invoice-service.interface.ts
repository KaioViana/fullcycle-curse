import { findInvoiceInputDto, findInvoiceOutputDto } from "../../api/dto/invoce.service.dto";

interface IInvoiceService {
  get(input: findInvoiceInputDto): Promise<findInvoiceOutputDto>
}

export { IInvoiceService };
