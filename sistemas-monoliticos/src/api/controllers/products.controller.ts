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

    await this.productsService.create(input);
    return res.json({ message: 'Ok' }).status(200).send();
  }
}

export { ProductsController }; 
