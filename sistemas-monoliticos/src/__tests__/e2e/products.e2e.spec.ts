import app from '../../api/app';
import request from 'supertest';

describe('E2e products test', () => {
  it('should create a product', async () => {
    const body = {
      name: 'product 1',
      description: 'description',
      purchasePrice: 100,
      stock: 10,
    };

    const response = await request(app)
      .post('/products')
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      data: {
        name: body.name,
        description: body.description,
        purchasePrice: body.purchasePrice,
        stock: body.stock,
      }
    })
  })
})
