import { IProductModule } from "../../../interfaces/modules/product-module.interface";
import { IProductsService } from "../../../interfaces/api-services/products-service.interface";
import { createProductInputDto } from "../../dto/products.service.dto";

class ProductsService implements IProductsService {
  constructor(
    private readonly productModule: IProductModule
  ) { }

  async create(input: createProductInputDto): Promise<void> {
    try {
      return await this.productModule.addproduct(input);
    } catch (err) {
      throw new Error('Error while create product');
    }
  }
}

export { ProductsService };
