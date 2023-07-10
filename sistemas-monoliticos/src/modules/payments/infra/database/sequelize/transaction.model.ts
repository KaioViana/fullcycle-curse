import { DataTypes, Sequelize } from "sequelize";
import { Model, Table } from 'sequelize-typescript';

@Table
class TransactionModel extends Model {
  declare id: string;
  declare orderId: string;
  declare amount: number;
  declare status: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(instance: Sequelize) {

    TransactionModel.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
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
      tableName: 'transactions',
      timestamps: false,
    });
  }
}


export { TransactionModel };
