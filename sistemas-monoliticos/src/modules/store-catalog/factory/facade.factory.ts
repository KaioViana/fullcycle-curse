import { StoreCatalogFacade } from "../facade/store-catalog.facade";
import { IStoreCatalogFacade } from "../facade/store-catalog.facade.interface"
import { ProductRepository } from "../repository/product.repository"
import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecase/find-product/find-product.usecase"

class FacadeFactory {
  static create(): IStoreCatalogFacade {
    const productRepository = new ProductRepository();
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
