import { InvoiceEntity } from "../domain/invoice.entity";
import { IInvoiceGateway } from "../gateway/invoice.gateway";
import { IDatabaseContext } from "../infra/database/database.context.interface";

class InvoiceRepository implements IInvoiceGateway {
  constructor(
    private readonly databaseOperation: IDatabaseContext<InvoiceEntity>
  ) { }
  async generate(input: InvoiceEntity): Promise<void> {
    await this.databaseOperation.create(input);
  }

  async find(id: string): Promise<InvoiceEntity> {
    const invoice = await this.databaseOperation.findById(id);

    if (!invoice) {
      throw new Error('Invoice not found!');
    }

    return invoice;
  }
}

export { InvoiceRepository };
