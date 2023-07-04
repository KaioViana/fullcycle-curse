import { IUseCase } from "../../../@shared/usecase/use-case.interface";
import { IClientFacade } from "../../../client-adm/facade/client.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

class PlaceOrderUseCase implements IUseCase {
  constructor(
    private readonly clientFacade: IClientFacade
  ) {

  }
  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this.clientFacade.find(input.clientId);

    if (!client) {
      throw new Error('Client not found.');
    }

    this.validateProducts(input.products);

    return {} as Promise<PlaceOrderOutputDto>
  }

  private validateProducts(products: PlaceOrderInputDto['products']): void {
    if (products.length === 0) {
      throw new Error('No products selected.');
    }
  }
}

export { PlaceOrderUseCase };
