import { PlaceOrderFacadeInputDto, PlaceOrderOutputDto } from "./checkout.dto";

interface ICheckoutFacade {
  placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderOutputDto>;
}

export { ICheckoutFacade };
