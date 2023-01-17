import { CustomerRoutes, OrderRoutes } from "src/enums/ApplicationRoutes.enum";
import { AppServiceDecorator } from "./app.service.decorator";

class AppJsonHalDecorator extends AppServiceDecorator {
  getCustomers() {
    let data = super.getCustomers();

    return data;
  }

  getCustomerById(id: string) {
    const customerData = super.getCustomerById(id);

    const response = {
      _links: {
        self: { rel: 'self', href: `/${CustomerRoutes.BY_ID.replace(':id', id)}` },
        curies: [{ rel: 'documentation', name: 'ea', href: 'http://example.com' }],
        'ea:find_all': { rel: 'customers', href: `${this.SERVICE_URL}/${CustomerRoutes.ROOT}` }
      },
      ...customerData
    }

    return response;
  }

  getProducts(): void {

  }

  getItems(): void {


  }

  getOrders() {
    const data = super.getOrders();

    const response = {
      _links: {
        self: {
          href: `/ ${OrderRoutes.ROOT} `
        },
        curies: [{ name: 'ea', href: 'http://example.com/docs/rels/{rel}', templated: true }],
        current: { href: `/ ${OrderRoutes.ROOT} /page=1` },
        next: { href: `/${OrderRoutes.ROOT}/page=2` },
        count: data.orders.length,
        'ea:find': { href: `/${OrderRoutes.BY_ID}`, templated: true },
        _embedded: {
          "ea:order": data.orders.map(order => ({
            _links: {
              self: { href: `/${OrderRoutes.BY_ID.replace(':id', order.id)}` },
              "ea:customer": { href: `${CustomerRoutes.BY_ID.replace(':id', order.customer_id)}` }
            },
            ...order,
          }))
        }
      }
    }

    return response
  }

  getOrderById(id: string) {
    const orderData = super.getOrderById(id);
    const customerData = super.getCustomerById(orderData.customer_id);

    const response = {
      _links: {
        self: {
          rel: 'self',
          href: `${this.SERVICE_URL}/${OrderRoutes.BY_ID.replace(':id', id)}`
        },
        curies: [{ rel: 'documentation', name: 'ea', href: 'http://example.com/docs/rels/{rel}' }],
        'ea:find_all': { rel: 'orders', href: `${this.SERVICE_URL}/${OrderRoutes.ROOT}` }
      },
      _embedded: {
        customer: {
          _links: {
            self: {
              rel: 'self',
              href: `${this.SERVICE_URL}/${CustomerRoutes.BY_ID.replace(':id', orderData.customer_id)}`
            },
            curies: [{ rel: 'documentation', name: 'ea', href: 'http://example.com/docs/rels/{rel}' }],
            'ea:find_all': { rel: 'customers', href: `${this.SERVICE_URL}/${CustomerRoutes.ROOT}` }
          },
          ...customerData
        }
      },
      ...orderData,
    }
    return response
  }
}

export { AppJsonHalDecorator }
