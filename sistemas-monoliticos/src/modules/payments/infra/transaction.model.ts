import { DataTypes } from "sequelize";
import { Model, Table } from 'sequelize-typescript';
import { DatabaseConnection } from "./database.connection";

@Table
class TransactionModel extends Model {
  declare id: string;
  declare orderId: string;
  declare amount: number;
  declare status: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

TransactionModel.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
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
  sequelize: DatabaseConnection.getConnectionInstance(),
  tableName: 'transactions',
  timestamps: false,
})

export { TransactionModel };
