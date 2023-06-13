import { Product } from "../domain/product.entity";

interface IProductGateway {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}

export { IProductGateway };
