import { DataTypes, Sequelize } from "sequelize";
import { Model, Table } from "sequelize-typescript";

@Table
class ProductModel extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare purchasePrice: number;
  declare stock: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initModel(instance: Sequelize) {
    ProductModel.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
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
      },
    }, {
      sequelize: instance,
      tableName: 'products',
      timestamps: false,
    })
  }
}


export { ProductModel }
