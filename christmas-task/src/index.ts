import './styles.scss';

import data from './data/data';
import Toys from './components/toys';
import Modal from './components/modal';
import Main from './components/main';
import { Iopt } from './components/interfaces';

const options: Iopt = {
  filters: {
    size: ['большой'],
    shape: [],
    count: [2, 5],
    color: ['красный', 'желтый'],
    year: [],
    search: '',
    favorites: false,
  },
  sort: 'A-Z',
  favorites: ['1', '2', '20'],
};

const toys = new Toys(data, options);
const modal = new Modal();

const main = new Main(modal, toys);
main.init();
