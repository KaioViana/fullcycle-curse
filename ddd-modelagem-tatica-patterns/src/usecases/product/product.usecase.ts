import Product from "../../domain/product/entity/product";
import ProductRepositoryInterface from "../../domain/product/repository/product-repository.interface";

class ProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) { }

  async execute(entity: Product): Promise<Product> {
    try {
      this._create(entity);
      return entity;
    } catch (err) {
      throw new Error('Error to handle  product entity');
    }
  }

  private _create(entity: Product) {
    return this.productRepository.create(entity);
  }
}

export { ProductUseCase }
