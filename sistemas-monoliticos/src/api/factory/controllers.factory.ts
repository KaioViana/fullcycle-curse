import { FacadeFactory as ClientFacadeFactory } from '../../modules/client-adm/factory/facade.factory';
import { FacadeFactory as CheckoutFacadeFactory } from '../../modules/checkout/factory/facade.factory';
import { ProductAdmFacadeFactory } from "../../modules/product-adm/factory/facade.factory";
import { ClientsController } from '../controllers/clients.controller';
import { ProductsController } from "../controllers/products.controller";
import { ClientsService } from '../services/clients/clients.service';
import { ProductsService } from "../services/products/products.service";
import { CheckoutService } from '../services/checkout/checkout.service';
import { CheckoutController } from '../controllers/checkout.controller';

class ControllersFactory {

  static create() {
    const productFacade = ProductAdmFacadeFactory.create();
    const productsService = new ProductsService(productFacade);

    const clientFacade = ClientFacadeFactory.create();
    const clientsService = new ClientsService(clientFacade);

    const checkoutFacade = CheckoutFacadeFactory.create();
    const checkoutService = new CheckoutService(checkoutFacade);

    return {
      ProductsController: new ProductsController(productsService),
      ClientsController: new ClientsController(clientsService),
      CheckoutController: new CheckoutController(checkoutService),
    }
  }
}

export { ControllersFactory };
