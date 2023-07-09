import { Router } from 'express';
import { ControllersFactory } from './factory/controllers.factory';

const routes = Router();
const controllers = ControllersFactory.create();
const {
  ProductsController,
  ClientsController,
} = controllers;

routes.post('/products', async (req, res) => ProductsController.createProduct(req, res));
routes.post('/clients', async (req, res) => ClientsController.createClient(req, res));
routes.post('/checkout', () => null);

routes.get('/invoice:id', () => null);

export default routes;
