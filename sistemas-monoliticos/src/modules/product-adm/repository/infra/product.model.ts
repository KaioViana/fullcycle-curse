import { DataTypes } from "sequelize";
import { Model, Table } from "sequelize-typescript";
import { DatabaseConnection } from "./database.connection";

@Table
class ProductModel extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare purchasePrice: number;
  declare stock: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ProductModel.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  purchasePrice: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  stock: {
    type: DataTypes.NUMBER,
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
  tableName: 'products',
  timestamps: false,
})

export { ProductModel }
