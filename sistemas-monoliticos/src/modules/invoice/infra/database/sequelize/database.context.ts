import { Address } from "../../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../../@shared/domain/value-object/id.value-object";
import { InvoiceEntity } from "../../../domain/invoice.entity";
import { ProductEntity } from "../../../domain/product.entity";
import { IDatabaseContext } from "../database.context.interface";
import { InvoiceModel } from "./invoice.model";
import { ProductModel } from "./product.model";

class DatabaseContext implements IDatabaseContext<InvoiceEntity> {
  async create(input: InvoiceEntity): Promise<void> {
    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,
      items: input.items.map(product => ({
        id: product.id.id,
        name: product.name,
        price: product.price,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      include: [
        { model: ProductModel, as: 'items' },
      ]
    });
  }

  async findById(id: string): Promise<InvoiceEntity> {
    const invoice = await InvoiceModel.findOne({
      where: {
        id,
      },
      include: [{ model: ProductModel, as: 'items' }],
    });

    if (invoice) {
      const address = new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode,
      });
      const items = invoice.items.map(item => new ProductEntity({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      }));

      return new InvoiceEntity({
        id: new Id(invoice.id),
        name: invoice.name,
        document: invoice.document,
        address,
        items,
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      });
    }

    return null;
  }
}

export { DatabaseContext }
