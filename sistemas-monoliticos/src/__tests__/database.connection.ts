import { Sequelize } from "sequelize-typescript";

class DatabaseConnection {
  private static instance: DatabaseConnection = null;
  private static sequelize: Sequelize;

  private constructor(storage: string) {
    DatabaseConnection.sequelize = new Sequelize({
      storage,
      dialect: 'sqlite',
      logging: false,
    });
  }

  static getConnectionInstance(storage: string) {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection(storage);
    }
    return DatabaseConnection.sequelize;
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
