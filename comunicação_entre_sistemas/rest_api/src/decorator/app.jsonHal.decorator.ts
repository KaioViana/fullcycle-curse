import { AppServiceDecorator } from "./app.service.decorator";

class AppJsonHalDecorator extends AppServiceDecorator {
  getCustomers(): void {
    let customers = super.getCustomers();

    return customers;
  }

  getCustomerById(id: string): void {

  }

  getProducts(): void {

  }

  getItems(): void {

  }

  getOrders(): void {

  }
}

export { AppJsonHalDecorator }
