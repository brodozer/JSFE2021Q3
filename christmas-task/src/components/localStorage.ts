import { IOptToys, IOptTree } from './interfaces';

class LocalStorage {
  static getLS(key: string, defOpt: IOptTree): IOptTree;
  static getLS(key: string, defOpt: IOptToys): IOptToys;
  static getLS(key: string, defOpt: IOptTree | IOptToys) {
    if (localStorage[key]) {
      return JSON.parse(localStorage[key]);
    }
    return defOpt;
  }

  static setLS(key: string, opt: IOptTree | IOptToys, btnReset: HTMLElement) {
    if (!btnReset.classList.contains('disabled')) {
      localStorage[key] = JSON.stringify(opt);
    } else {
      localStorage.removeItem(key);
    }
  }

  static resetLS(event: Event) {
    const btnReset = event.target as HTMLElement;
    btnReset.classList.add('disabled');
    btnReset.textContent = 'нужно обновить страницу';
  }
}

export default LocalStorage;
