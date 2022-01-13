import { IData, IOptToys } from './interfaces';

class Filters {
  filter(data: IData[], opt: IOptToys) {
    let filterData = data.map((a) => ({ ...a }));
    Object.keys(opt.filters).forEach((key) => {
      switch (key) {
        case 'shape':
        case 'size':
        case 'color':
          if (opt.filters[key].length > 0) {
            filterData = filterData.filter((el) =>
              opt.filters[key].includes(el[key])
            );
          }
          break;
        case 'favorites':
          if (opt.filters[key]) {
            filterData = filterData.filter((el) =>
              opt.favorites.includes(el.num)
            );
          }
          break;
        case 'year':
        case 'count':
          if (opt.filters[key].length > 0) {
            filterData = filterData.filter(
              (el) =>
                Number(el[key]) >= opt.filters[key][0] &&
                Number(el[key]) <= opt.filters[key][1]
            );
          }
          break;
        case 'search':
          if (opt.filters[key].length > 0) {
            filterData = filterData.filter((el) =>
              el.name
                .toLowerCase()
                .includes((<string>opt.filters[key]).toLowerCase())
            );
          }
          break;
        default:
      }
    });
    return filterData;
  }
}

export default Filters;
