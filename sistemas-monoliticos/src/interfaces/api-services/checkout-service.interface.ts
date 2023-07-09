import { placeOrderInputDto, placeOrderOutputDto } from "../../api/dto/checkout.service.dto";

interface ICheckoutService {
  create(input: placeOrderInputDto): Promise<placeOrderOutputDto>;
}

export { ICheckoutService };
