import { StoreCatalogFacade } from "../facade/store-catalog.facade";
import { IStoreCatalogFacade } from "../facade/store-catalog.facade.interface"
import { DatabaseOperation } from "../infra/database/sequelize/database.operation";
import { DatabaseOperation as InMemoryDatabaseOperation } from '../../../__tests__/database/in-memory/database.operation';
import { ProductRepository } from "../repository/product.repository"
import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecase/find-product/find-product.usecase"
import { Product } from "../domain/product.entity";

class FacadeFactory {
  static create(): IStoreCatalogFacade {
    const sequelize = new DatabaseOperation();
    const productRepository = new ProductRepository(sequelize);
    const findProductUsecase = new FindProductUseCase(productRepository);
    const findAllProductUsecase = new FindAllProductsUseCase(productRepository);
    const storeCatalogFacade = new StoreCatalogFacade(
      findProductUsecase,
      findAllProductUsecase,
    );

    return storeCatalogFacade;
  }
  static createMock(): IStoreCatalogFacade {
    const inMemory = new InMemoryDatabaseOperation<Product>();
    const productRepository = new ProductRepository(inMemory);
    const findProductUsecase = new FindProductUseCase(productRepository);
    const findAllProductUsecase = new FindAllProductsUseCase(productRepository);
    const storeCatalogFacade = new StoreCatalogFacade(
      findProductUsecase,
      findAllProductUsecase,
    );

    return storeCatalogFacade;
  }
}

export { FacadeFactory }
