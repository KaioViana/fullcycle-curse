import { ProductAdmFacade } from "../facade/product-adm.facade";
import { DatabaseContext } from "../infra/database/sequelize/database.context";
import { InMemoryDatabaseContext } from '../../../__tests__/database/in-memory/database.context';
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase";
import { CheckStockUseCase } from "../usecase/check-stock/check-stock.usecase";
import { Product } from "../domain/product.entity";

class ProductAdmFacadeFactory {
  static create() {
    const sequelize = new DatabaseContext();
    const productRepository = new ProductRepository(sequelize);
    const addProductUsecase = new AddProductUseCase(productRepository);
    const checkStockUsecase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade(
      addProductUsecase,
      checkStockUsecase,
    );

    return productFacade;
  }

  static createMock() {
    const inMemory = new InMemoryDatabaseContext<Product>
    const productRepository = new ProductRepository(inMemory);
    const addProductUsecase = new AddProductUseCase(productRepository);
    const checkStockUsecase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade(
      addProductUsecase,
      checkStockUsecase,
    );

    return productFacade;
  }
}

export { ProductAdmFacadeFactory };
