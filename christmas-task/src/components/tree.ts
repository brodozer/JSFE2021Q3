import { IData } from './interfaces';

class Tree {
  favoritesBolls: HTMLElement;

  christmasTree: HTMLElement;

  constructor() {
    this.favoritesBolls = document.querySelector('.favorites-bolls');
    this.christmasTree = document.querySelector('.christmas-tree');
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

  init() {
    // установить фон
    // установить елку
  }
}

export default Tree;
