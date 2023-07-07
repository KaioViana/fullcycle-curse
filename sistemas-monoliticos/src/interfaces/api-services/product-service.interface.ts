import { createProductInputDto } from "../../api/dto/products.service.dto";

interface IProductService {
  create(input: createProductInputDto): Promise<void>;
}

export { IProductService };
