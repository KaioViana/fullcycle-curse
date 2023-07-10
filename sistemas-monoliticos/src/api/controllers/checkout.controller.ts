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
      products: body?.products?.map((product: { productId: string; }) => ({
        productId: product?.productId,
      })),
    }

    try {
      const checkout = await this.checkoutService.create(input);
      return res.status(201).json({ data: checkout }).send();
    } catch (err) {
      const error = err as Error;
      return res.json({ data: { message: 'Bad request', error: error.message } });
    }
  }
}

export { CheckoutController };
