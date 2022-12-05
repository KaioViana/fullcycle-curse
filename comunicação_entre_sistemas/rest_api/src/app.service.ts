import { Injectable, NotAcceptableException, UnsupportedMediaTypeException } from '@nestjs/common';
import { Request } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ContentTypes, AcceptTypes } from './enums/ApplicationTypes.enum';

@Injectable()
export class AppService {
  private data: any;
  constructor() {
    const rawdata = readFileSync(join(__dirname, './helpers/database.json'));
    this.data = JSON.parse(rawdata.toString());
  }
  getCustomers(req: Request): any {
    const {
      accept: acceptType,
    } = req.headers;

    switch (acceptType) {
      case String(AcceptTypes.JSON):
        return {
          customers: this.data.customers
        }
      default:
        throw new NotAcceptableException();
    }
  }

  getCustomerById(req: Request, id: string): any {
    const {
      accept: acceptType,
    } = req.headers;

    switch (acceptType) {
      case String(AcceptTypes.JSON):
        return this.data.customers.find(customer => customer.id === id)
    }
  }

  getProducts() {
    return {
      products: this.data.products
    }
  }

  getItems() {
    return {
      items: this.data.items
    }
  }

  getOrders() {
    return {
      orders: this.data.orders
    }
  }
}
