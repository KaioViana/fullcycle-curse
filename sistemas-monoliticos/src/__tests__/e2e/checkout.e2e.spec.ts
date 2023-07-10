import { Address } from "../../modules/@shared/domain/value-object/address.value-object";
import { Id } from "../../modules/@shared/domain/value-object/id.value-object";
import { ClientAdm } from "../../modules/client-adm/domain/client.entity";
import { Product } from "../../modules/product-adm/domain/product.entity";
import { Product as ProductCatalog } from '../../modules/store-catalog/domain/product.entity';
import { InMemoryDatabaseContext } from "../database/in-memory/database.context";
import app from '../../api/app';
import request from 'supertest';

describe('E2e checkout test', () => {
  it('should create a checkout', async () => {
    const clientIdMock = new Id();
    const productIdMock = new Id();
    const clientMock = new ClientAdm({
      id: clientIdMock,
      name: 'name',
      email: 'email@example.com',
      document: '0000000',
      address: new Address({
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
      })
    });
    const productMock = new Product({
      id: productIdMock,
      name: 'product 1',
      description: 'description',
      purchasePrice: 100,
      stock: 10
    });
    const productCatalog = new ProductCatalog({
      id: productIdMock,
      name: productMock.name,
      description: productMock.description,
      salesPrice: 100,
    });


    InMemoryDatabaseContext.inMemoryData.push(clientMock);
    InMemoryDatabaseContext.inMemoryData.push(productMock);
    InMemoryDatabaseContext.inMemoryData.push(productCatalog);

    const body = {
      clientId: clientIdMock.id,
      products: [{ productId: productIdMock.id }],
    }

    const response = await request(app)
      .post('/checkout')
      .send(body);
    expect(response.statusCode).toBe(201);
  });
});
