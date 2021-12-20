import { IData, IOptTree } from './interfaces';

class Tree {
  favoritesBolls: HTMLElement;

  christmasTree: HTMLElement;

  container: HTMLElement;

  selectTree: HTMLElement;

  selectBcg: HTMLElement;

  opt: IOptTree = {
    tree: '/assets/tree/1.png',
    bcg: '/assets/bg/1.jpg',
    lights: false,
    colorLights: 'red',
  };

  constructor() {
    this.favoritesBolls = document.querySelector('.favorites-bolls');
    this.christmasTree = document.querySelector('.christmas-tree');
    this.selectTree = document.querySelector('.christmas-trees');
    this.selectBcg = document.querySelector('.background');
    this.container = document.querySelector('.tree');
  }

  renderCards(cards: IData[]) {
    let html = '';
    cards.forEach((card) => {
      html += `
            <div class="card-boll">
                <img src="./assets/toys/${card.num}.png" alt="" />
                <span>${card.count}</span>
            </div>
        `;
    });
    this.favoritesBolls.innerHTML = html;
  }

  setBcg(event: Event) {
    const target = event.target as HTMLElement;
    this.addActive(target.closest('.select-bcg'), 'bcg');
  }

  setTree(event: Event) {
    const target = event.target as HTMLElement;
    this.addActive(target.closest('.select-tree'), 'tree');
  }

  applySettings() {
    this.selectBcg
      .querySelector(`a[data-url="${this.opt.bcg}"]`)
      .classList.add('active');
    this.selectTree
      .querySelector(`a[data-url="${this.opt.tree}"]`)
      .classList.add('active');
    this.container.style.backgroundImage = `url(${this.opt.bcg})`;
    this.christmasTree.innerHTML = `<img src="${this.opt.tree}" alt="" />`;
    // звук
    // снег
    // гирлянда
  }

  addActive(link: HTMLElement, key: string) {
    if (link && !link.classList.contains('active')) {
      link
        .closest('.select')
        .querySelector('.active')
        .classList.remove('active');
      link.classList.add('active');
      const { url } = link.dataset;
      if (key === 'bcg') {
        this.container.style.backgroundImage = `url(${url})`;
      } else {
        this.christmasTree.innerHTML = `<img src="${url}" alt="" />`;
      }
      this.opt[key] = url;
    }
  }

  events() {
    this.selectBcg.addEventListener('click', this.setBcg.bind(this));
    this.selectTree.addEventListener('click', this.setTree.bind(this));
    // повесить обработчики на выбор елки и фона
  }

  init() {
    this.events();
    this.applySettings();
    // установить фон
    // установить елку
  }
}

export default Tree;
