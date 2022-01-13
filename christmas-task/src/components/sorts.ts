import Filters from './filters';
import { IData } from './interfaces';

class Sorts extends Filters {
  sort(data: IData[], typeSort: string) {
    if (typeSort !== 'disable') {
      switch (typeSort) {
        case 'A-Z':
          data.sort((a: IData, b: IData) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });
          break;
        case 'Z-A':
          data.sort((a: IData, b: IData) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();
            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;
          });
          break;
        case 'year-up':
          data.sort((a: IData, b: IData) => Number(a.year) - Number(b.year));
          break;
        case 'year-down':
          data.sort((a: IData, b: IData) => Number(b.year) - Number(a.year));
          break;
        default:
      }
    }
  }
}

export default Sorts;
