import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { IClientFacade } from "../../../client-adm/facade/client.facade.interface";
import { IProductAdmFacade } from "../../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

class PlaceOrderUseCase implements IUseCase {
  constructor(
    private readonly clientFacade: IClientFacade,
    private readonly productFacade: IProductAdmFacade
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
}

export { PlaceOrderUseCase };
