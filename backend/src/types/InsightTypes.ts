import { Document } from 'mongoose';

export interface Iinsight extends Document {
  end_year: number;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: number;
  impact: string;
  added: Date;
  published: Date;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}

// export interface IFilters {
//   start_year?: number;
//   end_year?: number;
//   topics?: string[];
//   sector?: string;
//   region?: string;
//   pestle?: string;
//   source?: string;
//   country?: string;
//   city?: string;
// }
