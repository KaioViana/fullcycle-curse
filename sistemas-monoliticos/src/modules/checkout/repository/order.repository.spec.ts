import { InMemoryDatabaseContext } from "../../../__tests__/database/in-memory/database.context"
import { Address } from "../../@shared/domain/value-object/address.value-object";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { ClientEntity } from "../domain/client.entity";
import { OrderEntity } from "../domain/order.entity"
import { ProductEntity } from "../domain/product.entity";
import { OrderRepository } from "./order.repository";

describe('Order repository test', () => {
  it('shoud add a order', async () => {
    const inMemory = new InMemoryDatabaseContext<OrderEntity>();
    const repository = new OrderRepository(inMemory);
    const mockOrderId = new Id();
    const mockItems = [
      new ProductEntity({
        id: new Id(),
        name: 'name',
        description: 'description',
        salesPrice: 100,
      }),
      new ProductEntity({
        id: new Id(),
        name: 'name',
        description: 'description',
        salesPrice: 100,
      })
    ];
    const mockClient = new ClientEntity({
      id: new Id(),
      name: 'name',
      email: 'email@example.com',
      document: 'document',
      address: new Address({
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipCode',
      })
    })
    const mockOrder = new OrderEntity({
      id: mockOrderId,
      client: mockClient,
      products: mockItems,
    });

    repository.addOrder(mockOrder);

    const order = await InMemoryDatabaseContext.inMemoryData.find(x => x.id.id === mockOrderId.id);

    expect(order.id.id).toBe(mockOrderId.id);
    expect(order.client.id.id).toBe(mockOrder.client.id.id);
    expect(order.client.name).toBe(mockOrder.client.name);
    expect(order.client.email).toBe(mockOrder.client.email);
    expect(order.client.document).toBe(mockOrder.client.document);
    expect(order.client.address.street).toBe(mockOrder.client.address.street);
    expect(order.client.address.number).toBe(mockOrder.client.address.number);
    expect(order.client.address.complement).toBe(mockOrder.client.address.complement);
    expect(order.client.address.city).toBe(mockOrder.client.address.city);
    expect(order.client.address.state).toBe(mockOrder.client.address.state);
    expect(order.client.address.zipCode).toBe(mockOrder.client.address.zipCode);
    expect(order.status).toBe(mockOrder.status);
    expect(order.total).toBe(mockOrder.total);
  });
});
