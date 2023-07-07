import { IProductModule } from "../../../interfaces/modules/product-module.interface";
import { IProductService } from "../../../interfaces/api-services/product-service.interface";
import { createProductInputDto } from "../../dto/products.service.dto";

class ProductService implements IProductService {
  constructor(
    private readonly productModule: IProductModule
  ) { }

  async create(input: createProductInputDto): Promise<void> {
    try {
      await this.productModule.addproduct(input);
    } catch (err) {
      throw new Error('Error while create product');
    }
  }
}

export { ProductService };
