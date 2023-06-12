import { IUseCase } from "../../@shared/usecase/use-case.interface";
import { ProductAdmFacade } from "../facade/product-adm.facade";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase";
import { CheckStockUseCase } from "../usecase/check-stock/check-stock.usecase";

class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
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
