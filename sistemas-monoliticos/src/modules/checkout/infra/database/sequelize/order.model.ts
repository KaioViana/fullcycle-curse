import { DataTypes, Sequelize } from "sequelize";
import { Model, Table } from "sequelize-typescript";
import { ProductModel } from "./product.model";

@Table
class OrderModel extends Model {
  declare id: string;
  declare clientId: string;
  declare status: string;
  declare total: number;

  static initModel(instance: Sequelize) {
    OrderModel.init({
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      clientId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
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
      }
    }, {
      sequelize: instance,
      tableName: 'orders',
      timestamps: false,
    });

    OrderModel.hasMany(ProductModel, { as: 'items', foreignKey: 'orderId' });
  }
}

export { OrderModel };
