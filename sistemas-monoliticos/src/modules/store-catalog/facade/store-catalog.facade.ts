import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../usecase/find-product/find-product.usecase";
import { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto } from "./store-catalog.facade.dto";
import { IStoreCatalogFacade } from "./store-catalog.facade.interface";

class StoreCatalogFacade implements IStoreCatalogFacade {
  constructor(
    private readonly findProductUsecase: FindProductUseCase,
    private readonly findAllProductUsecase: FindAllProductsUseCase,
  ) { }

  async find(input: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return this.findProductUsecase.execute(input);
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this.findAllProductUsecase.execute();
  }
}

export { StoreCatalogFacade };
