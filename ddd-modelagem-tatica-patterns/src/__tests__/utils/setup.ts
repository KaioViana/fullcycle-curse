import { Sequelize } from "sequelize-typescript"
import { prismaClient } from "../../infrastructure/db/prisma/client/prismaClient";
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

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
}

export const setupPrismaDatabase = () => {
  beforeEach(async () => {
    await prismaClient.product.deleteMany();
  });
}
