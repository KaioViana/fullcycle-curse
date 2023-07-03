import { ProductAdmFacade } from "../facade/product-adm.facade";
import { DatabaseOperation } from "../infra/database/sequelize/database.operation";
import { DatabaseOperation as InMemoryDatabaseOperation } from '../../../__tests__/database/in-memory/database.operation';
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase";
import { CheckStockUseCase } from "../usecase/check-stock/check-stock.usecase";
import { Product } from "../domain/product.entity";

class ProductAdmFacadeFactory {
  static create() {
    const sequelize = new DatabaseOperation();
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
    const inMemory = new InMemoryDatabaseOperation<Product>
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
