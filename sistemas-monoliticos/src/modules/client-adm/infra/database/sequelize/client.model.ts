import { DataTypes, Sequelize } from "sequelize";
import { Model, Table } from "sequelize-typescript";

@Table
class ClientModel extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare address: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(instance: Sequelize) {
    ClientModel.init({
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      sequelize: instance,
      tableName: 'clients',
      timestamps: false,
    });
  }
}


export { ClientModel }
