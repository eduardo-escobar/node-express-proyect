
import { Application } from 'express';
import productRoutes from './products-routes';
import userRoutes from './user-routes';

export default (app:Application):void => {
  app.use('/api/v1/user', userRoutes);
  app.use('/api/v1/product', productRoutes);
};
