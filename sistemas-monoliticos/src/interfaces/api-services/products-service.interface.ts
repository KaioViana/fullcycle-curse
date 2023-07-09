import { createProductInputDto } from "../../api/dto/products.service.dto";

interface IProductsService {
  create(input: createProductInputDto): Promise<void>;
}

export { IProductsService };
