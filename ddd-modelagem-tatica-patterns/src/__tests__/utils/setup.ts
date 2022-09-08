import { Model, ModelCtor, Sequelize } from "sequelize-typescript"
import { prismaClient } from "../../infrastructure/db/prisma/client/prismaClient";
import CustomerModel from "../../infrastructure/db/sequelize/model/customer.model";
import OrderItemModel from "../../infrastructure/db/sequelize/model/order-item.model";
import OrderModel from "../../infrastructure/db/sequelize/model/order.model";
import ProductModel from "../../infrastructure/db/sequelize/model/product.model";

export const setupInMemorySequelize = () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel, CustomerModel, OrderModel, OrderItemModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
}

export const setupPrismaDatabase = () => {
  beforeEach(async () => {
    await prismaClient.product.deleteMany();
    await prismaClient.customer.deleteMany();
  });
}
