import './styles.scss';

import data from './data/data';
import Toys from './components/toys';
import Tree from './components/tree';
import Modal from './components/modal';
import Main from './components/main';

const toys: Toys = new Toys(data);
const modal: Modal = new Modal();
const tree: Tree = new Tree();

const main: Main = new Main(modal, toys, tree);
main.init();

console.log(`
оценка: 200/200
- Вёрстка страниц приложения и навигация между ними (30)
- Меню с настройками (50)
- Гирлянда (40)
- Игрушки в избранном (80)
- Дополнительный функционал на выбор (0/20)
`);
