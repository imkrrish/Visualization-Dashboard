import { Router } from 'express';
import InsightController from '../../controllers/InsightController';

class ReviewRoutes {
  appRouter = Router();
  insightCtrl = new InsightController();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.appRouter
      .route('/')
      .get((req, res) => this.insightCtrl.getAllInsights(req, res))
      .post((req, res) => this.insightCtrl.addInsight(req, res));

    this.appRouter.route('/batch').post((req, res) => this.insightCtrl.addInsightBatch(req, res));
  }
}

export default new ReviewRoutes().appRouter;
