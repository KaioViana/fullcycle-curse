import { DataTypes, Sequelize } from "sequelize";
import { Table, Model } from "sequelize-typescript";
import { OrderModel } from "./order.model";

@Table
class ClientModel extends Model {
  declare id: string;
  declare name: string;
  declare email: string;
  declare document: string;
  declare street: string;
  declare number: string;
  declare complement: string;
  declare city: string;
  declare state: string;
  declare zipCode: string;
  declare orderId: string;

  static initModel(instance: Sequelize) {
    ClientModel.init({
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
      email: {
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
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {
      sequelize: instance,
      tableName: 'clients',
      timestamps: false,
    });

    ClientModel.belongsTo(OrderModel);
  }
}

export { ClientModel };
