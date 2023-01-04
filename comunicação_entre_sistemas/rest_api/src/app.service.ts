import { Injectable, NotAcceptableException, UnsupportedMediaTypeException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppServiceInterface } from './interface/appService.interface';

@Injectable()
export class AppService implements AppServiceInterface {

  private _getData() {
    const rawdata = readFileSync(join(__dirname, './helpers/database.json'));
    return JSON.parse(rawdata.toString());
  }

  getCustomers(): any {
    const data = this._getData();
    return {
      customers: data.customers
    }
  }

  getCustomerById(id: string): any {
    const data = this._getData();
    return data.customers.find(customer => customer.id === id)
  }

  getCustomerOrders(id: string): any {
    const data = this._getData();
    return { orders: data.orders.filter(order => order.customer_id === id) }
  }

  getProducts(): any {
    const data = this._getData();
    return {
      products: data.products
    }
  }

  getItems(): any {
    const data = this._getData();
    return {
      items: data.items
    }
  }

  getOrders(): any {
    const data = this._getData();
    return {
      orders: data.orders
    }
  }

  getOrderById(id: string) {
    const data = this._getData();
    return data.orders.find(order => order.id === id);
  }
}
