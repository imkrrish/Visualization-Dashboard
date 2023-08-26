import { Application } from 'express';
import insightRoutes from './insightRoutes';

export default class Routes {
  constructor(app: Application) {
    app.use('/api/v1/insights', insightRoutes);
  }
}