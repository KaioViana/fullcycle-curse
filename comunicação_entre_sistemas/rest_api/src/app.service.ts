import { Injectable, NotAcceptableException, UnsupportedMediaTypeException } from '@nestjs/common';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ContentTypes, AcceptTypes } from './enums/ApplicationTypes.enum';
import { AppServiceInterface } from './interface/appService.interface';

@Injectable()
export class AppService implements AppServiceInterface {
  private data: any;
  constructor() {
    const rawdata = readFileSync(join(__dirname, './helpers/database.json'));
    this.data = JSON.parse(rawdata.toString());
  }

  getCustomers(): any {
    return {
      customers: this.data.customers
    }
  }

  getCustomerById(id: string): any {

    return this.data.customers.find(customer => customer.id === id)
  }

  getProducts(): any {
    return {
      products: this.data.products
    }
  }

  getItems(): any {
    return {
      items: this.data.items
    }
  }

  getOrders(): any {
    return {
      orders: this.data.orders
    }
  }
}
