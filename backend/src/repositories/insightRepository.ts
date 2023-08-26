import InsightModel from '../models/InsightModel';
import { Iinsight } from '../types/InsightTypes';
import BaseRepo from './baseRepository';

export default class InsightRepo extends BaseRepo {
  defaultSortingOrder: any = ['name', 'DESC'];

  async addNewInsight(data: Iinsight) {
    return await InsightModel.create(data);
  }

  async addInsightBatch(data: Iinsight[]) {
    return await InsightModel.insertMany(data);
  }

  async getAllInsights(query: any) {
    let order = {};
    let filters: any = {};
    this.setOrder(query, this.defaultSortingOrder, order);

    if (query.start_year) {
      filters.start_year = { $gte: query.start_year };
    }

    if (query.end_year) {
      filters.end_year = { $lte: query.end_year };
    }

    if (query.topic && query.topic.length > 0) {
      filters.topic = { $in: query.topic };
    }

    if (query.sector) {
      filters.sector = query.sector;
    }

    if (query.region) {
      filters.region = query.region;
    }

    if (query.pestle) {
      filters.pestle = query.pestle;
    }

    if (query.source) {
      filters.source = query.source;
    }

    if (query.country) {
      filters.country = query.country;
    }

    let getAllInsightRes = await InsightModel.find(filters).sort(order);
    let count = await InsightModel.countDocuments(filters);
    
    return { getAllInsightRes, count };
  }
}
