import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { Product } from "../../domain/product.entity";
import { IProductGateway } from "../../gateway/product.gateway";
import { IAddProductInputDto, IAddProductOutputDto } from "./add-product.dto";

class AddProductUseCase implements IUseCase {
  constructor(
    private readonly productRepository: IProductGateway,
  ) { }
  async execute(input: IAddProductInputDto): Promise<IAddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    }
    const product = new Product(props);

    await this.productRepository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}

export { AddProductUseCase };
