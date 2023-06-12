import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { Product } from "../../domain/product.entity";
import { IProductGateway } from "../../gateway/product.gateway";
import { ICheckStockInputDto, ICheckStockOutputDto } from "./check-stock.dto";

class CheckStockUseCase implements IUseCase {
  constructor(
    private readonly productRepository: IProductGateway
  ) { }
  async execute(input: ICheckStockInputDto): Promise<ICheckStockOutputDto> {
    const product = await this.productRepository.find(input.productId);
    if (!product) {
      throw new Error('Product not found.');
    }

    const productEntity = new Product(product);

    return {
      productId: productEntity.id.id,
      stock: productEntity.stock,
    }
  }
}

export { CheckStockUseCase };
