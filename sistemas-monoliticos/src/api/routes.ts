import { Router } from 'express';

const routes = Router();

routes.post('/products', () => null);
routes.post('/clients', () => null);
routes.post('/checkout', () => null);

routes.get('/invoice:id', () => null);

export default routes;
