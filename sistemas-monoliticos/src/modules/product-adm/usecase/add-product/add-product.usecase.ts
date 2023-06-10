import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { ProductGateway } from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

class AddProductUseCase {
  constructor(
    private readonly productRepository: ProductGateway,
  ) { }
  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(),
      name: input.name,
      description: input.name,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    }
    const product = new Product(props);

    this.productRepository.add(product);

    return {
      id: product?.id?.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createAt,
      updatedAt: product.updatedAt
    }
  }
}

export { AddProductUseCase };
