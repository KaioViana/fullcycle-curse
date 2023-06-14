import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { IProductGateway } from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutpudDto } from "./find-product.dto";

class FindProductUseCase implements IUseCase {
  constructor(
    private readonly productRepository: IProductGateway,
  ) { }
  async execute(input?: FindProductInputDto): Promise<FindProductOutpudDto> {
    const product = await this.productRepository.find(input.id);
    if (!product) {
      throw new Error('Product not found');
    }

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }
  }
}

export { FindProductUseCase }
