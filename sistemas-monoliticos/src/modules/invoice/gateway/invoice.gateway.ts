import { InvoiceEntity } from "../domain/invoice.entity";

interface IInvoiceGateway {
  find(id: string): Promise<InvoiceEntity>;
  generate(input: InvoiceEntity): Promise<void>;
}

export { IInvoiceGateway };
