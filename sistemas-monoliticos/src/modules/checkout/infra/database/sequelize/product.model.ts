import { DataTypes, Sequelize } from "sequelize";
import { Table, Model } from "sequelize-typescript";
import { OrderModel } from "./order.model";

@Table
class ProductModel extends Model {
  declare id: string;
  declare orderId: string;
  declare name: string;
  declare description: string;
  declare salesPrice: number;

  static initModel(instance: Sequelize) {
    ProductModel.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.UUID,
        references: {
          model: OrderModel,
          key: 'id',
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      salesPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
      sequelize: instance,
      tableName: 'products',
      timestamps: false,
    });

    ProductModel.belongsTo(OrderModel);
  }
}

export { ProductModel };
