import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { IClientFacade } from "../../../client-adm/facade/client.facade.interface";
import { IProductAdmFacade } from "../../../product-adm/facade/product-adm.facade.interface";
import { IStoreCatalogFacade } from "../../../store-catalog/facade/store-catalog.facade.interface";
import { ProductEntity } from "../../domain/product.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

class PlaceOrderUseCase implements IUseCase {
  constructor(
    private readonly clientFacade: IClientFacade,
    private readonly productFacade: IProductAdmFacade,
    private readonly catalogFacade: IStoreCatalogFacade,
  ) {

  }
  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this.clientFacade.find(input.clientId);

    if (!client) {
      throw new Error('Client not found.');
    }

    await this.validateProducts(input.products);

    return {} as Promise<PlaceOrderOutputDto>
  }

  private async validateProducts(products: PlaceOrderInputDto['products']): Promise<void> {
    if (products.length === 0) {
      throw new Error('No products selected.');
    }

    for (const product of products) {
      const checkStock = await this.productFacade.checkStock({ productId: product.productId });
      if (checkStock.stock === 0) {
        throw new Error(`Product ${product.productId} is not available in stock.`);
      }
    }
  }

  private async getProduct(productId: string): Promise<ProductEntity> {
    const product = await this.catalogFacade.find({ id: productId });
    if (!product) {
      throw new Error('Product not found.');
    }

    return new ProductEntity({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}

export { PlaceOrderUseCase };
