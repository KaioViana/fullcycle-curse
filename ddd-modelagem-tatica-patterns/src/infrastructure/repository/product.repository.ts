import product from "../../domain/entity/product";
import { ProductRepositoryPrisma } from "./prisma/product.repository.prisma";
import { ProductRepositorySequelize } from "./sequelize/product.repository.sequelize";

class ProductRepository extends ProductRepositoryPrisma {
  constructor() {
    super();
  }

  async create(entity: product): Promise<void> {
    return super.create(entity);
  }

  async find(id: string): Promise<product> {
    return super.find(id);
  }

  async findAll(): Promise<product[]> {
    return super.findAll();
  }

  async update(entity: product): Promise<void> {
    return super.update(entity);
  }
}

export { ProductRepository };
