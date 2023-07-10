import { Address } from "../../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../../@shared/domain/value-object/id.value-object";
import { ClientEntity } from "../../../domain/client.entity";
import { OrderEntity } from "../../../domain/order.entity";
import { ProductEntity } from "../../../domain/product.entity";
import { IDatabaseContext } from "../database.context.interface";
import { ClientModel } from "./client.model";
import { OrderModel } from "./order.model";
import { ProductModel } from "./product.model";

class DatabaseContext implements IDatabaseContext<OrderEntity> {
  async create(input: OrderEntity): Promise<void> {
    await OrderModel.create({
      id: input.id.id,
      client: {
        id: input.client.id.id,
        name: input.client.name,
        email: input.client.email,
        document: input.client.email,
        street: input.client.address.street,
        number: input.client.address.number,
        complement: input.client.address.complement,
        city: input.client.address.city,
        state: input.client.address.state,
        zipCode: input.client.address.zipCode,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      status: input.status,
      total: input.total,
      items: input.products.map(product => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      include: [
        { model: ProductModel, as: 'items' },
        { model: ClientModel, as: 'client' },
      ]
    })
  }

  async findById(id: string): Promise<OrderEntity> {
    const order = await OrderModel.findOne({
      where: {
        id
      },
      include: [
        { model: ProductModel, as: 'items' },
        { model: ClientModel, as: 'client' },
      ]
    });

    if (order) {
      const address = new Address({
        street: order.client.street,
        number: order.client.number,
        complement: order.client.complement,
        city: order.client.city,
        state: order.client.state,
        zipCode: order.client.zipCode,
      });

      const client = new ClientEntity({
        id: new Id(order.client.id),
        name: order.client.name,
        email: order.client.email,
        document: order.client.document,
        address,
      });

      const products = order.items.map(product => new ProductEntity({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      }));

      return new OrderEntity({
        id: new Id(order.id),
        status: order.status,
        client,
        products,
      });
    }

    return null;
  }
}

export { DatabaseContext }
