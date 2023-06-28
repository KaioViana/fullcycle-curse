import { Sequelize } from "sequelize-typescript";

class DatabaseConnection {
  private static instance: DatabaseConnection = null;
  private static sequelize: Sequelize;

  private constructor() {
    DatabaseConnection.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory_db',
      logging: false,
    });
  }

  static getConnectionInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
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
