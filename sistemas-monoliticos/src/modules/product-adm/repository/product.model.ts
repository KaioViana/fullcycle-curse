import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id!: string;

  @Column
  name!: string;

  @Column
  description!: string;

  @Column
  purchasePrice!: number;

  @Column
  stock!: number;

  @Column
  createdeAt!: Date;

  @Column
  updatedAt!: Date;
}

export { ProductModel }
