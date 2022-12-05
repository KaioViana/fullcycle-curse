import {
  Controller,
  Delete,
  Get,
  Header,
  MethodNotAllowedException,
  Options,
  Param,
  Request
} from '@nestjs/common';
import { Request as Req } from 'express';
import { AppService } from './app.service';
import { Customers } from './enums/AllowedMethods.enum';
import { CustomerRoutes } from './enums/ApplicationRoutes.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Options(CustomerRoutes.ROOT)
  @Header('allow', Object.values(Customers).join(', '))
  getCustomersOptions(): void { }

  @Delete('*')
  @Header('allow', Object.values(Customers).join(', '))
  deleteCustomer() {
    throw new MethodNotAllowedException();
  }

  @Get(CustomerRoutes.ROOT)
  getCustomers(@Request() req: Req): any {
    return this.appService.getCustomers(req);
  }

  @Get(CustomerRoutes.BY_ID)
  getCustomerById(@Request() req: Req, @Param() { id }: { id: string }): any {
    return this.appService.getCustomerById(req, id);
  }

  @Get('products')
  getProducts() {
    return this.appService.getProducts();
  }

  @Get('items')
  getItems() {
    return this.appService.getItems();
  }

  @Get('orders')
  getOrders() {
    return this.appService.getOrders();
  }
}
