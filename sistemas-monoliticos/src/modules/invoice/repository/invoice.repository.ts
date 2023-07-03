import { IDatabase } from "../../@shared/infra/database/database.interface";
import { InvoiceEntity } from "../domain/invoice.entity";
import { IInvoiceGateway } from "../gateway/invoice.gateway";

class InvoiceRepository implements IInvoiceGateway {
  constructor(
    private readonly databaseOperation: IDatabase<InvoiceEntity>
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
