import { ICheckoutService } from "../../../interfaces/api-services/checkout-service.interface";
import { ICheckoutModule } from "../../../interfaces/modules/checkout-module.interface";
import { placeOrderInputDto, placeOrderOutputDto } from "../../dto/checkout.service.dto";

class CheckoutService implements ICheckoutService {
  constructor(
    private readonly checkoutModule: ICheckoutModule,
  ) { }

  async create(input: placeOrderInputDto): Promise<placeOrderOutputDto> {
    try {
      console.log('INPUT', input)
      return await this.checkoutModule.placeOrder(input);
    } catch (err) {
      console.log("ERROR", err);
      throw new Error('Error while place order');
    }
  }
}

export { CheckoutService };
