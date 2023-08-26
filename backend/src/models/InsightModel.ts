import { model, Schema } from 'mongoose';
import { Iinsight } from '../types/InsightTypes';

const InsightSchema: Schema = new Schema(
  {
    end_year: Number,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: Number,
    impact: String,
    added: Date,
    published: Date,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number,
  },
  { timestamps: true }
);

export default model<Iinsight>('insights', InsightSchema);
