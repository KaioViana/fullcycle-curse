import { DataTypes, Sequelize } from "sequelize";
import { Model, Table } from "sequelize-typescript";
import { ProductModel } from "./product.model";

@Table
class InvoiceModel extends Model {
  declare id: string;
  declare document: string;
  declare name: string;
  declare street: string;
  declare number: string;
  declare complement: string;
  declare city: string;
  declare state: string;
  declare zipCode: string;
  declare items: ProductModel[];

  static initModel(instance: Sequelize) {
    InvoiceModel.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }, {
      sequelize: instance,
      tableName: 'invoices',
      timestamps: false,
    });
    InvoiceModel.hasMany(ProductModel, { as: 'items', foreignKey: 'invoiceId' });
  }
}

export { InvoiceModel };
