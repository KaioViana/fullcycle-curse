import { DataTypes, Sequelize } from "sequelize";
import { Table, Model } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table
class ProductModel extends Model {
  declare id: string;
  declare invoiceId: string;
  declare name: string;
  declare price: number;

  static initModel(instance: Sequelize) {
    ProductModel.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      invoiceId: {
        type: DataTypes.UUID,
        references: {
          model: InvoiceModel,
          key: 'id',
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
      sequelize: instance,
      tableName: 'products',
      timestamps: false,
    });

    ProductModel.belongsTo(InvoiceModel);
  }
}

export { ProductModel };
