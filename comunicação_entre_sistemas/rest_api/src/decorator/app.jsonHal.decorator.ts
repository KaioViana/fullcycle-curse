import { CustomerRoutes, OrderRoutes, ItemsRoutes, ProductRoutes } from "src/enums/ApplicationRoutes.enum";
import { AppServiceDecorator } from "./app.service.decorator";

class AppJsonHalDecorator extends AppServiceDecorator {
  getCustomers() {
    const customerData = super.getCustomers();

    const response = {
      _links: {
        self: { rel: 'self', href: `${this.SERVICE_URL}/${CustomerRoutes.ROOT}` },
        curies: [{ rel: 'documentation', name: 'ea', href: 'http://example.com/rels/{rel}' }],
        'ea:customer_by_id': { rel: 'customer_by_id', href: `${this.SERVICE_URL}/${CustomerRoutes.BY_ID}` }
      },
      ...customerData,
    }

    return response;
  }

  getCustomerById(id: string) {
    const customerData = super.getCustomerById(id);

    const response = {
      _links: {
        self: { rel: 'self', href: `/${CustomerRoutes.BY_ID.replace(':id', id)}` },
        curies: [{ rel: 'documentation', name: 'ea', href: 'http://example.com/rels/{rel}' }],
        'ea:find_all': { rel: 'customers', href: `${this.SERVICE_URL}/${CustomerRoutes.ROOT}` },
        'ea:customer_orders': { rel: 'customer_orders', href: `${this.SERVICE_URL}/${CustomerRoutes.CUSTOMER_ORDERS}` }
      },
      ...customerData
    }

    return response;
  }

  getCustomerOrders(id: string) {
    const customerData = super.getCustomerOrders(id);

    const response = {
      _links: {
        self: { rel: 'self', href: `${this.SERVICE_URL}/${CustomerRoutes.CUSTOMER_ORDERS}` },
        curies: [{ rel: 'documentation', name: 'ea', href: 'http://example.com/rels/{rel}' }],
        'ea:find_all': { rel: 'customers', href: `${this.SERVICE_URL}/${CustomerRoutes.ROOT}` },
        'ea:customer_by_id': { rel: 'customer_by_id', href: `${this.SERVICE_URL}/${CustomerRoutes.CUSTOMER_ORDERS}` },
        'ea:orders': { rel: 'orders', href: `${this.SERVICE_URL}/${OrderRoutes.ROOT}` }
      },
      orders: customerData.orders.map(order => order)
    }

    return response;
  }

  getProducts(): void {
    const productsData = super.getProducts();

    const response = {
      _links: {
        self: { rel: 'self', href: `${this.SERVICE_URL}/${ProductRoutes.ROOT}` },
        curies: [{ rel: 'documentation', name: 'ea', href: 'http://example.com/rels/{rel}' }],
      },
      ...productsData
    }

    return response;
  }

  getItems() {
    const itemsData = super.getItems();

    const response = {
      _links: {
        self: { rel: 'self', href: `${this.SERVICE_URL}/${ItemsRoutes.ROOT}` },
        curies: [{ rel: 'documentation', name: 'ea', href: 'http://example.com/rels/{rel}' }],
        'ea:order_by_id': { rel: 'order_by_id', href: `${this.SERVICE_URL}/${OrderRoutes.BY_ID}` },
        'ea:product_by_id': { rel: 'product_by_id', href: `${this.SERVICE_URL}/${ProductRoutes.BY_ID}` }
      },
      ...itemsData,
    }

    return response;

  }

  getOrders() {
    const data = super.getOrders();

    const response = {
      _links: {
        self: {
          rel: 'self',
          href: `${this.SERVICE_URL}/${OrderRoutes.ROOT}`
        },
        curies: [{ resl: 'documentation', name: 'ea', href: 'http://example.com/docs/rels/{rel}' }],
        'ea:order_by_id': { rel: 'order_by_id', href: `${this.SERVICE_URL}/${OrderRoutes.BY_ID}` },
        'ea:customer_by_id': { rel: 'customer_by_id', href: `${this.SERVICE_URL}/${CustomerRoutes.BY_ID}` }
      },
      ...data
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
