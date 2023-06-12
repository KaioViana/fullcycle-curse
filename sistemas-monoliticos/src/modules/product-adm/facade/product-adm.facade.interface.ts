import {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.dto";

interface IProductAdmFacade {
  addproduct(input: AddProductFacadeInputDto): Promise<void>;
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>
}

export { IProductAdmFacade }
