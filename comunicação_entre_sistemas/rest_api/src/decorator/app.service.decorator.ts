import { AppService } from "src/app.service";
import { AppServiceInterface } from "src/interface/appService.interface";

abstract class AppServiceDecorator implements AppServiceInterface {
  protected readonly SERVICE_URL = 'http://localhost:3000';

  constructor(private readonly appService: AppService) { }

  getCustomers() {
    return this.appService.getCustomers();
  }

  getCustomerById(id: string) {
    return this.appService.getCustomerById(id);
  }

  getProducts() {
    return this.appService.getProducts();
  }

  getItems() {
    return this.appService.getItems();
  }

  getOrders() {
    return this.getOrders();
  }
}

export { AppServiceDecorator }
