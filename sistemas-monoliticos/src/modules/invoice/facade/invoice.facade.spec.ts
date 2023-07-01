import { Sequelize } from "sequelize-typescript";
import { DatabaseConnection } from "../../../__tests__/database.connection";
import { InvoiceModel } from "../infra/invoice.model";
import { ProductModel } from "../infra/product.model";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { InvoiceEntity } from "../domain/invoice.entity";
import { ProductEntity } from "../domain/product.entity";
import { Address } from "../../@shared/domain/value-object/address.value-object";
import { FacadeFactory } from "../factory/facade.factory";

describe('Invoice facade test', () => {
  let databaseInstance: Sequelize;

  beforeEach(async () => {
    databaseInstance = DatabaseConnection.getConnectionInstance(':memory_invoice');
    databaseInstance.addModels([InvoiceModel, ProductModel]);
    InvoiceModel.initModel(databaseInstance);
    ProductModel.initModel(databaseInstance);
    await databaseInstance.sync();
  });

  afterEach(async () => {
    await DatabaseConnection.closeConnection();
  });

  it('should generate a invoice', async () => {
    const input = {
      name: 'name',
      document: 'document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
      items: [
        { id: '123', name: 'name', price: 100 }
      ]
    }

    const facade = FacadeFactory.create();

    const invoice = await facade.generate(input);

    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.street).toBe(input.street);
    expect(invoice.number).toBe(input.number);
    expect(invoice.complement).toBe(input.complement);
    expect(invoice.city).toBe(input.city);
    expect(invoice.state).toBe(input.state);
    expect(invoice.items).toHaveLength(input.items.length);
    expect(invoice.total).toBe(100);
  });

  it('should find a invoice', async () => {
    const mockInvoiceId = new Id();
    const mockItems = [
      new ProductEntity({
        id: new Id(),
        name: 'name',
        price: 100,
      }),
      new ProductEntity({
        id: new Id(),
        name: 'name',
        price: 100,
      }),
    ];

    const mockInvoice = new InvoiceEntity({
      id: mockInvoiceId,
      name: 'name',
      document: 'document',
      address: new Address({
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
      }),
      items: mockItems,
    });

    await InvoiceModel.create({
      id: mockInvoice.id.id,
      name: mockInvoice.name,
      document: mockInvoice.document,
      street: mockInvoice.address.street,
      number: mockInvoice.address.number,
      complement: mockInvoice.address.complement,
      city: mockInvoice.address.city,
      state: mockInvoice.address.state,
      zipCode: mockInvoice.address.zipCode,
      createdAt: mockInvoice.createdAt,
      updatedAt: mockInvoice.updatedAt,
      items: mockInvoice.items.map(product => ({
        id: product.id.id,
        name: product.name,
        price: product.price
      })),
    }, {
      include: [
        { model: ProductModel, as: 'items' },
      ],
    });

    const facade = FacadeFactory.create();

    const invoice = await facade.find({ id: mockInvoiceId.id });

    expect(invoice.id).toBe(mockInvoiceId.id);
    expect(invoice.name).toBe(mockInvoice.name);
    expect(invoice.document).toBe(mockInvoice.document);
    expect(invoice.address.street).toBe(mockInvoice.address.street);
    expect(invoice.address.number).toBe(mockInvoice.address.number);
    expect(invoice.address.complement).toBe(mockInvoice.address.complement);
    expect(invoice.address.city).toBe(mockInvoice.address.city);
    expect(invoice.address.state).toBe(mockInvoice.address.state);
    expect(invoice.items).toHaveLength(mockItems.length);
    expect(invoice.total).toBe(200);
    expect(invoice.createdAt).toBeDefined();
  });
});
