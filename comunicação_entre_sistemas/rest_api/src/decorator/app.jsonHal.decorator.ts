import { CustomerRoutes } from "src/enums/ApplicationRoutes.enum";
import { AppServiceDecorator } from "./app.service.decorator";

class AppJsonHalDecorator extends AppServiceDecorator {
  getCustomers() {
    let response = super.getCustomers();

    response = response.customers.map(customer => {
      customer._links = {
        self: {
          href: `${this.SERVICE_URL}/${CustomerRoutes.BY_ID.replace(
            ':id',
            customer.id
          )}`
        }
      }
      return customer
    });

    return { customers: response };
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
