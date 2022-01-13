import * as noUiSlider from 'nouislider';
import { IData, IOptToys } from './interfaces';
import LocalStorage from './localStorage';
import Sorts from './sorts';

class Toys extends Sorts {
  data: IData[];

  filterData: IData[];

  searchElem: HTMLElement;

  closeSearch: HTMLElement;

  favoritesCount: HTMLElement;

  cards: string[];

  balls: HTMLElement;

  checkFavorites: HTMLInputElement;

  selectSort: HTMLSelectElement;

  btnsFilter: NodeList;

  btnFilterReset: HTMLElement;

  yearSlider: noUiSlider.target;

  yearStart: HTMLElement;

  yearEnd: HTMLElement;

  countSlider: noUiSlider.target;

  countStart: HTMLElement;

  countEnd: HTMLElement;

  sidebar: HTMLElement;

  btnResetSettings: HTMLElement;

  defOpt: IOptToys = {
    filters: {
      size: [],
      shape: [],
      count: [],
      color: [],
      year: [],
      search: '',
      favorites: false,
    },
    sort: false,
    favorites: [],
  };

  opt: IOptToys;

  constructor(data: IData[]) {
    super();
    this.data = data;
    this.balls = document.querySelector('.balls');
    this.searchElem = document.getElementById('search');
    this.closeSearch = document.querySelector('.close-search');
    this.favoritesCount = document.querySelector('.favorites-count');
    this.checkFavorites = document.querySelector('.check-favorites');
    this.selectSort = document.querySelector('.sort');
    this.btnsFilter = document.querySelectorAll('.btn-filter');
    this.btnFilterReset = document.querySelector('.btn-filter-reset');
    this.yearSlider = document.getElementById('year-slider');
    this.yearStart = document.querySelector('.year-start');
    this.yearEnd = document.querySelector('.year-end');
    this.countSlider = document.getElementById('count-slider');
    this.countStart = document.querySelector('.count-start');
    this.countEnd = document.querySelector('.count-end');
    this.sidebar = document.getElementById('filters');
    this.btnResetSettings = document.querySelector('.btn-reset-toys');
  }

  buildCards() {
    let html = '';
    this.filterData.forEach((el) => {
      const isFavorite: boolean = this.opt.favorites.indexOf(el.num) !== -1;
      html += `<div class="card" id="${el.num}">
              <div class="card-image">
                <img src="/assets/toys/${el.num}.png" />
                <a class="btn-flat btn-favorite"
                  ><i class="material-icons">${
                    isFavorite ? 'favorite' : 'favorite_border'
                  }</i></a
                >
              </div>
              <div class="card-content">
                <span class="card-title">${el.name}</span>
                <ul class="collection">
                  <li class="collection-item">
                    <span>Кол-во:</span><span>${el.count}</span>
                  </li>
                  <li class="collection-item">
                    <span>Год покупки:</span><span>${el.year}</span>
                  </li>
                  <li class="collection-item">
                    <span>Форма:</span><span>${el.shape}</span>
                  </li>
                  <li class="collection-item">
                    <span>Цвет:</span><span>${el.color}</span>
                  </li>
                  <li class="collection-item">
                    <span>Размер</span><span>${el.size}</span>
                  </li>
                </ul>
              </div>
            </div>`;
    });
    return html;
  }

  renderCards() {
    if (this.filterData.length > 0) {
      this.balls.innerHTML = this.buildCards();
    } else {
      this.showMessage(this.sidebar, 'Совпадений, не найдено');
    }
  }

  applyFilters() {
    this.filterData = this.filter(this.data, this.opt);
    this.renderCards();
  }

  addFavorites(event: Event) {
    if ((<HTMLElement>event.target).closest('.btn-favorite')) {
      const card = (<HTMLElement>event.target).closest('.card');
      const btnIcon = card.querySelector('.material-icons');
      const id = card.getAttribute('id');
      if (btnIcon.textContent === 'favorite') {
        const index = this.opt.favorites.indexOf(id);
        this.opt.favorites.splice(index, 1);
        btnIcon.textContent = 'favorite_border';
      } else {
        if (this.opt.favorites.length === 20) {
          this.showMessage(card, 'Извините, все слоты заняты');
          return;
        }
        this.opt.favorites.push(id);
        btnIcon.textContent = 'favorite';
      }
      this.favoritesCount.textContent = String(this.opt.favorites.length);
    }
  }

  getFavorites() {
    if (this.opt.favorites.length > 0) {
      return this.data.filter((el) => this.opt.favorites.includes(el.num));
    }
    return this.data.filter((el) => Number(el.num) <= 20);
  }

  showMessage(elem: Element, msg: string) {
    const div = document.createElement('div');
    div.classList.add('msg');
    div.textContent = msg;
    elem.appendChild(div);
    div.style.opacity = '1';
    setTimeout(() => {
      div.remove();
    }, 2500);
  }

  addFilters(event: Event) {
    const btn: HTMLElement = (event.target as HTMLElement).closest(
      '.btn-filter'
    );
    const filter = btn.dataset.filter.split('-');
    const [key, value] = filter;
    btn.classList.toggle('active');
    const index = (this.opt.filters[key] as Array<string>).indexOf(value);
    if (index === -1) {
      (this.opt.filters[key] as Array<string>).push(value);
    } else {
      (this.opt.filters[key] as Array<string>).splice(index, 1);
    }

    this.applyFilters();
  }

  showFavorites() {
    this.opt.filters.favorites = this.checkFavorites.checked;
    this.applyFilters();
  }

  resetFilters() {
    const filters: string[] = Object.keys(this.opt.filters);
    filters.forEach((filter) => {
      this.opt.filters[filter] = this.defOpt.filters[filter];
    });
    this.btnsFilter.forEach((btn) => {
      (btn as HTMLElement).classList.remove('active');
    });
    this.checkFavorites.checked = false;
    this.resetSlider(
      this.yearSlider,
      ['1940.00', '2020.00'],
      this.yearStart,
      this.yearEnd
    );
    this.resetSlider(
      this.countSlider,
      ['1.00', '12.00'],
      this.countStart,
      this.countEnd
    );

    this.applyFilters();
  }

  initSlider(
    slider: noUiSlider.target,
    start: number[],
    step: number,
    key: string,
    s: HTMLElement,
    e: HTMLElement
  ) {
    noUiSlider.create(slider, {
      start,
      step,
      connect: true,
      orientation: 'horizontal',
      range: {
        min: start[0],
        max: start[1],
      },
    });
    if ((this.opt.filters[key] as []).length > 0) {
      slider.noUiSlider.set(this.opt.filters[key] as []);
      this.setSlider(this.opt.filters[key] as [], s, e);
    }
    slider.noUiSlider.on('change', (values: string[], handle: number) => {
      const startEnd = [s, e];
      startEnd[handle].innerHTML = values[handle].slice(0, -3);
      this.opt.filters[key] = slider.noUiSlider.get() as number[];
      this.applyFilters();
    });
  }

  setSlider(values: string[], s: HTMLElement, e: HTMLElement) {
    const [a, b] = values;
    const start = s;
    const end = e;
    start.textContent = a.slice(0, -3);
    end.textContent = b.slice(0, -3);
  }

  resetSlider(
    slider: noUiSlider.target,
    values: string[],
    s: HTMLElement,
    e: HTMLElement
  ) {
    slider.noUiSlider.reset();
    this.setSlider(values, s, e);
  }

  applySettings() {
    if (this.opt.sort) {
      const options = this.selectSort.querySelectorAll('option');

      for (let i = 0; i < options.length; i += 1) {
        if (options[i].value === this.opt.sort) options[i].selected = true;
      }
    }
    this.btnsFilter.forEach((btn) => {
      const filter = (btn as HTMLElement).dataset.filter.split('-');
      const [key, value] = filter;
      if ((this.opt.filters[key] as string[]).includes(value)) {
        (btn as HTMLElement).classList.add('active');
      }
    });
    this.checkFavorites.checked = this.opt.filters.favorites;
    this.favoritesCount.textContent = String(this.opt.favorites.length);
  }

  search() {
    const { value } = this.searchElem as HTMLInputElement;
    if (this.opt.filters.search !== value) {
      this.opt.filters.search = value;
      this.applyFilters();
    }
  }

  clearSearch() {
    (this.searchElem as HTMLInputElement).value = '';
    this.search();
  }

  events() {
    this.btnsFilter.forEach((btn) => {
      btn.addEventListener('click', this.addFilters.bind(this));
    });
    this.selectSort.addEventListener('change', () => {
      this.opt.sort = this.selectSort.value;
      this.sort(this.data, this.selectSort.value);
      this.applyFilters();
    });
    this.balls.addEventListener('click', this.addFavorites.bind(this));
    this.checkFavorites.addEventListener(
      'change',
      this.showFavorites.bind(this)
    );
    this.btnFilterReset.addEventListener('click', this.resetFilters.bind(this));
    this.searchElem.addEventListener('input', this.search.bind(this));
    this.closeSearch.addEventListener('click', this.clearSearch.bind(this));
    this.btnResetSettings.addEventListener('click', LocalStorage.resetLS);
    window.addEventListener(
      'beforeunload',
      LocalStorage.setLS.bind(this, 'optToys', this.opt, this.btnResetSettings)
    );
  }

  init() {
    this.opt = LocalStorage.getLS('optToys', this.defOpt);
    this.applySettings();
    this.sort(this.data, this.selectSort.value);
    this.applyFilters();
    this.events();
    this.initSlider(
      this.yearSlider,
      [1940, 2020],
      10,
      'year',
      this.yearStart,
      this.yearEnd
    );
    this.initSlider(
      this.countSlider,
      [1, 12],
      1,
      'count',
      this.countStart,
      this.countEnd
    );
  }
}

export default Toys;
