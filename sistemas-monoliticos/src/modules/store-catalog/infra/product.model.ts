import { DataTypes } from "sequelize";
import { Table, Model } from "sequelize-typescript";
import { DatabaseConnection } from "./database.connection";

@Table
class ProductModel extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare salesPrice: number;
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
    allowNull: false,
  },
  salesPrice: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
  sequelize: DatabaseConnection.getConnectionInstance(),
  tableName: 'products',
  timestamps: false,
})

export { ProductModel }