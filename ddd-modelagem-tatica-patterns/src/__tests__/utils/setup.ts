import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../infrastructure/db/sequelize/model/product.model";

const setupSequelize = () => {
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

export const setupMemoryDatabase = async () => {
  setupSequelize();
}
