import { IUseCase } from "../../@shared/usecase/use-case.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.dto";
import { IProductAdmFacade } from "./product-adm.facade.interface";

class ProductAdmFacade implements IProductAdmFacade {
  constructor(
    private readonly addProductUsecase: IUseCase,
    private readonly checkStockUsecase: IUseCase,
  ) { }

  addproduct(input: AddProductFacadeInputDto): Promise<void> {
    return this.addProductUsecase.execute(input);
  }

  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this.checkStockUsecase.execute(input);
  }
}

export { ProductAdmFacade };
