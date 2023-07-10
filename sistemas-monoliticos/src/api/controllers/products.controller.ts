import { Request, Response } from 'express';
import { IProductsService } from '../../interfaces/api-services/products-service.interface';

class ProductsController {
  constructor(
    private readonly productsService: IProductsService,
  ) { }

  async createProduct(req: Request, res: Response) {
    const { body } = req;
    const input = {
      name: body?.name,
      description: body?.description,
      purchasePrice: body?.purchasePrice,
      stock: body?.stock,
    }

    try {
      const product = await this.productsService.create(input);
      return res.json({ data: product }).status(201).send();
    } catch (err) {
      const error = err as Error;
      return res.status(400).json({ data: { message: 'Bad request', error: error.message } });
    }
  }
}

export { ProductsController }; 
