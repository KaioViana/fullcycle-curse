import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { IProductGateway } from "../../gateway/product.gateway";
import { FindAllProductsOutputDto } from "./find-all-products.dto";

class FindAllProductsUseCase implements IUseCase {
  constructor(
    private readonly productReprository: IProductGateway,
  ) { }

  async execute(): Promise<FindAllProductsOutputDto> {
    const products = await this.productReprository.findAll();

    return {
      products: products.map(item => ({
        id: item.id.id,
        name: item.name,
        description: item.description,
        salesPrice: item.salesPrice,
      })),
    }
  }
}

export { FindAllProductsUseCase };
