import app from '../../api/app';
import request from 'supertest';

describe('E2e clients test', () => {
  it('should create a client', async () => {
    const body = {
      name: "client1",
      email: "client1@example.com",
      document: "000000000",
      address: {
        street: "street",
        number: "0",
        complement: "complement",
        city: "city",
        state: "state",
        zipCode: "zipCode"
      }
    }

    const response = await request(app)
      .post('/clients')
      .send(body);

    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      data: {
        name: body.name,
        email: body.email,
        document: body.document,
        address: {
          street: body.address.street,
          number: body.address.number,
          complement: body.address.complement,
          city: body.address.city,
          state: body.address.state,
          zipCode: body.address.zipCode,
        }
      }
    })
  });
});
