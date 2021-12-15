type Tfilters = {
  [key: string]: boolean | Array<string> | Array<number> | string;
  size: string[];
  shape: string[];
  count: number[];
  color: string[];
  year: number[];
  search: string;
  favorites: boolean;
};

export interface Idata {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface Iopt {
  filters: Tfilters;
  sort: string | boolean;
  favorites: string[];
}
