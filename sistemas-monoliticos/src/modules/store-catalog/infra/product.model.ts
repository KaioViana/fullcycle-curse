import { DataTypes, Sequelize } from "sequelize";
import { Table, Model } from "sequelize-typescript";

@Table
class ProductModel extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare salesPrice: number;

  static initModel(instance: Sequelize) {
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
      sequelize: instance,
      tableName: 'catalog',
      timestamps: false,
    });
  }
}

export { ProductModel }
