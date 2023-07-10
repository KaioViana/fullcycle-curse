import { InvoiceEntity } from "../domain/invoice.entity";
import { IInvoiceGateway } from "../gateway/invoice.gateway";
import { IDatabaseContext } from "../infra/database/database.context.interface";

class InvoiceRepository implements IInvoiceGateway {
  constructor(
    private readonly databaseContext: IDatabaseContext<InvoiceEntity>
  ) { }
  async generate(input: InvoiceEntity): Promise<void> {
    await this.databaseContext.create(input);
  }

  async find(id: string): Promise<InvoiceEntity> {
    const invoice = await this.databaseContext.findById(id);

    if (!invoice) {
      throw new Error('Invoice not found!');
    }

    return invoice;
  }
}

export { InvoiceRepository };
