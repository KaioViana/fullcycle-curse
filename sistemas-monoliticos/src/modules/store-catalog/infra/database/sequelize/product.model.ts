import { DataTypes, Sequelize } from "sequelize";
import { Table, Model } from "sequelize-typescript";

@Table
class ProductModel extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare salesPrice: number;
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
        allowNull: false,
      },
      salesPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      }
    }, {
      sequelize: instance,
      tableName: 'products',
      timestamps: false,
    });
  }
}

export { ProductModel }
