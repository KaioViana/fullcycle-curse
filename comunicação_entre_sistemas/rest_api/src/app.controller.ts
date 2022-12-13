import {
  Controller,
  Delete,
  Get,
  Header,
  MethodNotAllowedException,
  NotAcceptableException,
  Options,
  Param,
  Request
} from '@nestjs/common';
import { Request as Req } from 'express';
import { AppService } from './app.service';
import { AppJsonHalDecorator } from './decorator/app.jsonHal.decorator';
import { Customers } from './enums/AllowedMethods.enum';
import { CustomerRoutes } from './enums/ApplicationRoutes.enum';
import { AcceptTypes } from './enums/ApplicationTypes.enum';

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
    const {
      accept: acceptType
    } = req.headers;

    switch (acceptType) {
      case String(AcceptTypes.JSON):
        return this.appService.getCustomers();
      case String(AcceptTypes.HAL_JSON):
        console.log('JSON_HAL');
        let service = new AppJsonHalDecorator(this.appService);
        return service.getCustomers();
      default:
        throw new NotAcceptableException();
    }
  }

  @Get(CustomerRoutes.BY_ID)
  getCustomerById(@Request() req: Req, @Param() { id }: { id: string }): any {
    return this.appService.getCustomerById(id);
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
