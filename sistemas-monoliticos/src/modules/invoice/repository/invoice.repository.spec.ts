import { InvoiceRepository } from "./invoice.repository";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { InvoiceEntity } from "../domain/invoice.entity";
import { ProductEntity } from "../domain/product.entity";
import { Address } from "../../@shared/domain/value-object/address.value-object";
import { DatabaseOperation } from "../../../__tests__/database/in-memory/database.operation";

describe('Invoice repository test', () => {
  it('should generate a invoice', async () => {
    const inMemory = new DatabaseOperation<InvoiceEntity>()
    const repository = new InvoiceRepository(inMemory);
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
      })
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

    await repository.generate(mockInvoice);

    const invoice = await DatabaseOperation.inMemoryData.find(x => x.id.id === mockInvoiceId.id);

    expect(invoice.id.id).toBe(mockInvoiceId.id);
    expect(invoice.name).toBe(mockInvoice.name);
    expect(invoice.document).toBe(mockInvoice.document);
    expect(invoice.address.street).toBe(mockInvoice.address.street);
    expect(invoice.address.number).toBe(mockInvoice.address.number);
    expect(invoice.address.complement).toBe(mockInvoice.address.complement);
    expect(invoice.address.city).toBe(mockInvoice.address.city);
    expect(invoice.address.state).toBe(mockInvoice.address.state);
    expect(invoice.items).toHaveLength(mockItems.length);
  });

  it('should find a invoice', async () => {
    const inMemory = new DatabaseOperation<InvoiceEntity>();
    const repository = new InvoiceRepository(inMemory);

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

    DatabaseOperation.inMemoryData.push(mockInvoice);

    const invoice = await repository.find(mockInvoice.id.id);

    expect(invoice.id.id).toBe(mockInvoice.id.id);
    expect(invoice.name).toBe(mockInvoice.name);
    expect(invoice.document).toBe(mockInvoice.document);
    expect(invoice.address.street).toBe(mockInvoice.address.street);
    expect(invoice.address.number).toBe(mockInvoice.address.number);
    expect(invoice.address.complement).toBe(mockInvoice.address.complement);
    expect(invoice.address.city).toBe(mockInvoice.address.city);
    expect(invoice.address.state).toBe(mockInvoice.address.state);
    expect(invoice.address.zipCode).toBe(mockInvoice.address.zipCode);
    expect(invoice.items).toHaveLength(2);
  });
});
