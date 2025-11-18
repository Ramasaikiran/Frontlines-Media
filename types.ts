
export interface Company {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  industry: string;
  size?: string;
  founded?: number;
  shortDescription: string;
  website: string;
  logoUrl: string;
}

export interface Filters {
  search: string;
  location: string;
  industries: string[];
}

export interface Sort {
  key: 'name' | 'founded';
  direction: 'asc' | 'desc';
}

export enum ViewMode {
  CARD = 'CARD',
  TABLE = 'TABLE',
}
