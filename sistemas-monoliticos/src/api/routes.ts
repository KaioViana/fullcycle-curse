import { Router } from 'express';
import { ControllersFactory } from './factory/controllers.factory';

const routes = Router();
const controllers = process.env.NODE_ENV === 'test'
  ? ControllersFactory.createMock()
  : ControllersFactory.create();
const {
  ProductsController,
  ClientsController,
  CheckoutController,
  InvoiceController,
} = controllers;

routes.post('/products', async (req, res) => ProductsController.createProduct(req, res));
routes.post('/clients', async (req, res) => ClientsController.createClient(req, res));
routes.post('/checkout', async (req, res) => CheckoutController.palceOrder(req, res));

routes.get('/invoice/:id', async (req, res) => InvoiceController.getInvoice(req, res));

export default routes;
