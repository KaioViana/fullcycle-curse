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
import { CustomerRoutes, ItemsRoutes, OrderRoutes, ProductRoutes } from './enums/ApplicationRoutes.enum';
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
        let service = new AppJsonHalDecorator(this.appService);
        return service.getCustomers();
      default:
        throw new NotAcceptableException();
    }
  }

  @Get(CustomerRoutes.CUSTOMER_ORDERS)
  getCustomerOrders(@Request() req: Req, @Param() { id }: { id: string }): any {
    const { accept: acceptType } = req.headers;
    switch (acceptType) {
      case String(AcceptTypes.JSON):
        return this.appService.getCustomerOrders(id);
      case String(AcceptTypes.HAL_JSON):
        const service = new AppJsonHalDecorator(this.appService);
        return service.getCustomerOrders(id);
      default:
        throw new NotAcceptableException();
    }

  }

  @Get(CustomerRoutes.BY_ID)
  getCustomerById(@Request() req: Req, @Param() { id }: { id: string }): any {
    const { accept: acceptType } = req.headers
    switch (acceptType) {
      case String(AcceptTypes.JSON):
        return this.appService.getCustomerById(id);
      case String(AcceptTypes.HAL_JSON):
        const service = new AppJsonHalDecorator(this.appService)
        return service.getCustomerById(id);
      default:
        throw new NotAcceptableException();
    }
  }

  @Get(ProductRoutes.ROOT)
  getProducts(@Request() req: Req): any {
    const { accept: acceptType } = req.headers;
    switch (acceptType) {
      case String(AcceptTypes.JSON):
        return this.appService.getProducts();
      case String(AcceptTypes.HAL_JSON):
        const service = new AppJsonHalDecorator(this.appService);
        return service.getProducts();
      default:
        throw new NotAcceptableException();
    }
  }

  @Get(ItemsRoutes.ROOT)
  getItems(@Request() req: Req) {
    const { accept: acceptType } = req.headers;
    switch (acceptType) {
      case String(AcceptTypes.JSON):
        return this.appService.getItems()
      case String(AcceptTypes.HAL_JSON):
        const service = new AppJsonHalDecorator(this.appService);
        return service.getItems()
      default:
        throw new NotAcceptableException();
    }
  }

  @Get(OrderRoutes.ROOT)
  getOrders(@Request() req: Req) {
    const { accept: acceptType } = req.headers;

    switch (acceptType) {
      case String(AcceptTypes.JSON):
        return this.appService.getOrders();
      case String(AcceptTypes.HAL_JSON):
        const service = new AppJsonHalDecorator(this.appService);
        return service.getOrders();
      default:
        throw new NotAcceptableException();
    }
  }

  @Get(OrderRoutes.BY_ID)
  getOrderById(@Request() req: Req, @Param() { id }: { id: string }) {
    const { accept: acceptType } = req.headers;

    switch (acceptType) {
      case String(AcceptTypes.JSON):
        return this.appService.getOrderById(id);
      case String(AcceptTypes.HAL_JSON):
        const service = new AppJsonHalDecorator(this.appService);
        return service.getOrderById(id);
      default:
        throw new NotAcceptableException();
    }
  }
}
