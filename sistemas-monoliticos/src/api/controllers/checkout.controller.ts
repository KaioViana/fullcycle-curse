import { ICheckoutService } from "../../interfaces/api-services/checkout-service.interface";
import { Request, Response } from 'express';

class CheckoutController {
  constructor(
    private readonly checkoutService: ICheckoutService,
  ) { }

  async palceOrder(req: Request, res: Response) {
    const { body } = req;
    const input = {
      clientId: body?.clientId,
      products: body?.products?.maṕ((product: { productId: string; }) => ({
        productId: product?.productId,
      })),
    }

    const checkout = await this.checkoutService.create(input);
    return res.json({ data: checkout }).status(201).send();
  }
}

export { CheckoutController };
