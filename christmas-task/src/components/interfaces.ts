type TFilters = {
  [key: string]: boolean | Array<string> | Array<number> | string;
  size: string[];
  shape: string[];
  count: number[];
  color: string[];
  year: number[];
  search: string;
  favorites: boolean;
};

export interface IData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface IOptToys {
  filters: TFilters;
  sort: string | boolean;
  favorites: string[];
}

export interface IOptTree {
  [key: string]: string | boolean;
  tree: string;
  bcg: string;
  lights: boolean;
  colorLights: string;
}

export interface IPage {
  url: string;
  page: HTMLElement;
  btn: HTMLElement;
}
