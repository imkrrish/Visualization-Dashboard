import { Response, Request } from 'express';
import InsightRepo from '../repositories/insightRepository';
import { Iinsight } from '../types/InsightTypes';
import Logger from '../utils/winston.utils';
import BaseController from './baseController';
import Status from '../utils/status-codes-messages.utils';

class InsightController extends BaseController {
  insightRepo = new InsightRepo();

  async addInsight(req: Request, res: Response) {
    let data: Iinsight = req.body;

    let insightRes: any = await this.insightRepo.addNewInsight(data).catch((reason) => {
      console.error('addNewInsight: Failed to add Insight reason - ', reason.message);
      Logger.error('addNewInsight: ' + reason);
      return this.getDbError(reason);
    });

    if (insightRes.error) {
      this.sendError(res, this.getModifiedError(insightRes, Status.ERROR_CODES.insights.add_db_error_msg));
      return;
    }

    Logger.info('addNewInsight: ' + Status.SERVER_SUCCESS.insights.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.CREATED, insightRes);
  }

  async addInsightBatch(req: Request, res: Response) {
    let data: Iinsight[] = req.body;
    const batchSize = 3;
    const totalDocuments = data.length;

    for (let i = 0; i < totalDocuments; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      const result: any = await this.insightRepo.addInsightBatch(batch).catch((reason) => {
        console.error('addInsightBatch: Failed to add batch reason - ', reason.message);
        Logger.error('addInsightBatch: ' + reason);
        return this.getDbError(reason);
      });

      if (result.error) {
        this.sendError(res, this.getModifiedError(result, Status.ERROR_CODES.insights.add_db_error_msg));
        return;
      }
    }

    Logger.info('addInsightBatch: ' + Status.SERVER_SUCCESS.insights.data_added);
    this.sendSuccess(res, Status.HTTP_CODES.CREATED, { message: 'Batch insertion successful' });
  }

  async getAllInsights(req: Request, res: Response) {
    let reqQuery = req.query;
    // let queryError = this.checkQueryValidate(reqQuery);

    // if (queryError) {
    //   Logger.error('getAllInsights: queryValidate: ' + queryError);
    //   let error = this.getQueryError(queryError);
    //   this.sendError(res, this.getModifiedError(error, Status.ERROR_CODES.insights.get_db_error_msg));
    //   return;
    // }

    let { getAllInsightRes, count }: any = await this.insightRepo.getAllInsights(reqQuery);

    if (getAllInsightRes.error) {
      this.sendError(res, this.getModifiedError(getAllInsightRes, Status.ERROR_CODES.insights.get_db_error_msg));
    }

    if (getAllInsightRes.length == 0) {
      Logger.error('getAllInsights: ' + Status.SERVER_ERRORS.insight_not_found);
      this.sendError(res, Status.ERROR_CODES.insights.insight_not_found_msg);
      return;
    }

    Logger.info('getAllInsights: ' + Status.SERVER_SUCCESS.insights.data_fetched);
    this.sendSuccess(res, Status.HTTP_CODES.SUCCESS, getAllInsightRes, count);
  }
}

export default InsightController;
