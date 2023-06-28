import { Sequelize, } from "sequelize-typescript";
import { ProductModel } from "./product.model";

class DatabaseConnection {
  private static instance: DatabaseConnection = null;
  private static sequelize: Sequelize;

  constructor() {
    DatabaseConnection.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory_product',
      logging: false,
      sync: { force: true },
    });
    DatabaseConnection.sequelize.addModels([ProductModel])
  }

  static getConnectionInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.sequelize;
  }

  static async sync() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.sequelize.sync();
  }

  static async closeConnection() {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.sequelize.drop();
      await DatabaseConnection.sequelize.close();
      DatabaseConnection.instance = null;
    }
  }
}

export { DatabaseConnection } 
