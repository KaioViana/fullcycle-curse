import { Sequelize, } from "sequelize-typescript";
import { ClientModel } from "./client.model";

class DatabaseConnection {
  private static instance: DatabaseConnection = null;
  private static sequelize: Sequelize;
  private models = [ClientModel];

  private constructor() {
    DatabaseConnection.sequelize = new Sequelize({
      dialect: 'mysql',
      dialectOptions: {
        host: 'localhost',
        port: '3307',
        database: 'client_adm',
        user: 'admin',
        password: 'password',
      }
    });
    DatabaseConnection.sequelize.addModels(this.models);
    this.initModels();
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
      await DatabaseConnection.sequelize.close();
      DatabaseConnection.instance = null;
    }
  }

  private initModels() {
    this.models.forEach(model => model.initModel(DatabaseConnection.sequelize));
  }
}

export { DatabaseConnection } 
