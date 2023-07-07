import { Request, Response } from 'express';
import { IProductService } from '../../interfaces/api-services/product-service.interface';

class ProductsController {
  constructor(
    private readonly productsService: IProductService,
  ) { }

  async createProduct(req: Request, res: Response) {
    const { body } = req;
    const input = {
      name: body.name,
      description: body.description,
      purchasePrice: body.purchasePrice,
      stock: body.stock,
    }

    await this.productsService.create(input);
    res.json({ message: 'Ok' }).status(200).send();
  }
}

export { ProductsController }; 
