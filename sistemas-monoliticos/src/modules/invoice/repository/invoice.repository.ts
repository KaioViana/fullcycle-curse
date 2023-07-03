import { InvoiceEntity } from "../domain/invoice.entity";
import { IInvoiceGateway } from "../gateway/invoice.gateway";
import { IDatabaseOperation } from "../infra/database/sequelize/database.operation.interface";

class InvoiceRepository implements IInvoiceGateway {
  constructor(
    private readonly databaseOperation: IDatabaseOperation<InvoiceEntity>
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
