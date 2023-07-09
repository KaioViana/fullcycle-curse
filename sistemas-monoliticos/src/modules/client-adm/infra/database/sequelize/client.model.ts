import { DataTypes, Sequelize } from "sequelize";
import { Model, Table } from "sequelize-typescript";

@Table
class ClientModel extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare document: string;
  declare street: string;
  declare number: string;
  declare complement: string;
  declare city: string;
  declare state: string;
  declare zipCode: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(instance: Sequelize) {
    ClientModel.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      document: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      complement: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
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
