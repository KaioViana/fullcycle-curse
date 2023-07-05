import { PlaceOrderUseCase } from "../usecase/place-order/place-order.usecase";
import { PlaceOrderFacadeInputDto, PlaceOrderOutputDto } from "./checkout.dto";
import { ICheckoutFacade } from "./checkout.facade.interface";

class CheckoutFacade implements ICheckoutFacade {
  constructor(
    private readonly placeOrderUsecase: PlaceOrderUseCase
  ) { }

  async placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderOutputDto> {
    return this.placeOrderUsecase.execute(input);
  }
}

export { CheckoutFacade };
