import app from '../../api/app';
import request from 'supertest';
import { InMemoryDatabaseContext } from '../database/in-memory/database.context';
import { InvoiceEntity } from '../../modules/invoice/domain/invoice.entity';
import { ProductEntity } from '../../modules/invoice/domain/product.entity';
import { Id } from '../../modules/@shared/domain/value-object/id.value-object';
import { Address } from '../../modules/@shared/domain/value-object/address.value-object';

describe('E2e invoice test', () => {
  it('should get a invoice', async () => {
    const invoiceIdMock = new Id();
    const invoiceMock = new InvoiceEntity({
      id: invoiceIdMock,
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
      items: [new ProductEntity({
        id: new Id(),
        name: 'name',
        price: 100,
      })]
    })

    InMemoryDatabaseContext.inMemoryData.push(invoiceMock);

    const response = await request(app)
      .get(`/invoice/${invoiceIdMock.id}`)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        name: invoiceMock.name,
        document: invoiceMock.document,
        address: {
          street: invoiceMock.address.street,
          number: invoiceMock.address.number,
          complement: invoiceMock.address.complement,
          city: invoiceMock.address.city,
          state: invoiceMock.address.state,
          zipCode: invoiceMock.address.zipCode,
        },
        items: invoiceMock.items.map(item => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        total: 100,
      }
    })
  })
})
