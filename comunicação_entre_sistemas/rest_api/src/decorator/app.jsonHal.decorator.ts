import { CustomerRoutes } from "src/enums/ApplicationRoutes.enum";
import { AppServiceDecorator } from "./app.service.decorator";

class AppJsonHalDecorator extends AppServiceDecorator {
  getCustomers() {
    let customers = super.getCustomers();

    customers = customers.customers.map(customer => {
      customer._links = {
        self: {
          href: `${this.SERVICE_URL}/${CustomerRoutes.BY_ID.replace(
            ':id',
            customer.id
          )}`
        },
        orders: {
          href: `${this.SERVICE_URL}/${CustomerRoutes.CUSTOMER_ORDERS.replace(
            ':id',
            customer.id
          )}`
        }
      }
      return customer
    });

    return { customers };
  }

  getCustomerById(id: string): void {
    const customer = super.getCustomerById(id);
    customer._links = {
      self: {
        href: `${this.SERVICE_URL}/${CustomerRoutes.BY_ID.replace(
          ':id',
          id
        )}`
      },
      orders: {
        href: `${this.SERVICE_URL}/${CustomerRoutes.CUSTOMER_ORDERS.replace(
          ':id',
          id
        )}`
      }
    }

    return customer;
  }

  getProducts(): void {

  }

  getItems(): void {

  }

  getOrders(): void {

  }
}

export { AppJsonHalDecorator }
