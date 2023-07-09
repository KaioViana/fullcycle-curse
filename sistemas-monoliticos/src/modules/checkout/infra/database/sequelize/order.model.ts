import { DataTypes, Sequelize } from "sequelize";
import { Model, Table } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { ClientModel } from "./client.model";

@Table
class OrderModel extends Model {
  declare id: string;
  declare status: string;
  declare total: number;
  declare items: ProductModel[];
  declare client: ClientModel;

  static initModel(instance: Sequelize) {
    OrderModel.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, {
      sequelize: instance,
      tableName: 'orders',
      timestamps: false,
    });

    OrderModel.hasMany(ProductModel, { as: 'items', foreignKey: 'orderId' });
    OrderModel.hasOne(ClientModel, { as: 'client', foreignKey: 'orderId' });
  }
}

export { OrderModel };
