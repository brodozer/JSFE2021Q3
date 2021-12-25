import { IData, IOptTree } from './interfaces';
import LocalStorage from './localStorage';

class Tree {
  favoritesBolls: HTMLElement;

  christmasTree: HTMLImageElement;

  container: HTMLElement;

  selectTree: HTMLElement;

  selectBcg: HTMLElement;

  mapTree: HTMLElement;

  snowflakeContainer: HTMLElement;

  lightsContainer: HTMLElement;

  btnSnowflake: HTMLElement;

  btnSound: HTMLElement;

  toggleLight: HTMLInputElement;

  radioColorLights: NodeList;

  timerID: NodeJS.Timer;

  audio = new Audio('/assets/audio/audio.mp3');

  btnResetSettings: HTMLElement;

  map = [
    '250,1,185,85,204,130,161,117,148,139,177,166,168,190,177,216,115,197,95,227,123,250,111,281,162,297,118,304,118,344,77,336,65,362,105,387,99,432,24,424,10,451,44,472,41,497,79,506,77,527,3,532,2,577,31,584,45,624,60,629,76,653,109,644,100,674,136,693,161,659,176,705,208,709,222,679,242,703,284,701,290,677,305,703,379,693,379,663,396,663,434,676,457,650,475,591,467,571,494,568,495,532,440,528,423,482,460,470,454,442,415,432,407,397,364,407,375,388,435,372,429,342,390,347,385,329,361,325,365,310,394,309,399,283,365,269,412,240,394,210,362,218,349,179,368,160,352,131,315,147,315,117,283,115,312,81',
    '250,-1,235,40,216,35,217,62,204,62,208,82,187,83,199,109,173,112,187,135,170,135,177,172,165,174,163,190,145,190,149,212,146,232,130,228,140,258,118,275,133,290,94,300,98,318,86,327,108,348,112,359,74,370,96,391,86,406,105,425,56,446,73,476,36,479,42,493,28,499,56,522,27,521,49,555,44,560,15,544,14,584,31,608,-1,634,28,643,56,629,83,640,71,648,112,657,126,668,102,688,127,698,135,713,197,676,230,662,253,671,262,693,279,682,319,696,304,677,313,672,333,697,345,692,391,702,361,663,407,661,426,676,439,661,481,652,435,624,464,612,492,613,472,593,499,584,471,566,452,567,455,554,473,555,464,539,484,527,450,512,460,493,444,465,456,443,404,435,405,422,434,414,407,393,401,375,408,350,384,336,396,313,374,312,391,281,354,289,364,258,383,247,365,235,372,221,330,230,355,200,333,192,322,161,327,146,326,129,310,127,321,103,300,102,307,84,295,79,306,68,292,62,278,63,283,46,266,39',
    '238,0,224,14,230,36,204,51,211,82,183,109,196,142,171,144,175,161,155,172,172,180,149,213,168,230,142,234,150,253,131,252,138,272,115,304,123,325,109,340,106,358,126,370,85,375,100,396,78,400,63,468,44,488,58,502,38,527,48,548,23,565,30,587,6,607,23,626,22,647,68,678,94,671,127,679,144,672,133,689,148,708,178,685,189,695,204,680,231,702,266,678,311,713,382,670,383,643,410,671,464,672,482,640,463,607,492,602,470,517,448,504,465,489,449,450,429,451,444,411,420,400,426,380,412,339,389,337,385,321,403,314,375,303,383,290,380,249,364,243,350,218,354,199,334,181,346,155,324,138,326,117,306,108,308,90,291,85,299,56,281,42,266,42,255,26,247,8',
    '241,0,238,38,224,27,227,47,210,46,217,67,194,66,198,91,172,137,150,150,167,163,166,185,150,199,123,207,149,216,139,255,115,273,115,292,77,320,125,313,105,329,89,354,79,389,60,410,106,401,28,492,85,479,41,535,43,557,3,598,27,601,3,631,29,640,5,667,60,651,80,672,76,709,111,697,143,664,167,687,184,674,241,692,260,711,272,694,297,684,331,702,343,681,359,693,371,678,450,709,426,664,415,642,464,642,450,618,493,618,463,592,454,567,407,536,451,525,418,491,401,472,449,463,407,427,425,403,389,372,361,347,404,348,388,327,399,313,359,288,363,262,333,240,371,232,331,212,343,205,323,185,341,175,317,160,328,147,306,130,292,98,282,60,256,34',
    '249,5,210,96,188,114,191,140,169,175,155,230,153,267,132,286,128,316,118,327,112,359,128,375,101,390,96,411,75,417,78,442,113,455,62,458,58,473,92,495,52,513,43,532,42,554,89,553,24,572,20,588,41,603,4,608,3,629,66,644,42,661,72,701,127,688,128,705,160,690,184,671,193,695,215,693,242,701,264,686,293,710,369,706,376,678,430,696,438,682,423,658,491,639,488,615,458,609,476,587,447,564,449,546,453,521,430,507,404,499,423,484,389,458,425,429,398,402,380,388,386,359,381,343,362,337,367,315,336,313,335,298,351,293,343,259,327,242,342,226,326,214,322,183,299,176,311,151,299,125,268,53',
    '256,0,240,54,221,41,222,75,197,69,195,105,179,113,176,146,144,141,162,195,123,193,155,239,106,249,119,278,92,278,117,316,84,323,81,348,53,360,72,382,80,413,43,425,44,445,73,453,44,461,61,483,17,519,49,526,23,541,29,595,-1,618,51,642,62,666,92,667,98,688,153,683,164,702,231,692,247,701,273,698,300,710,433,652,482,648,479,611,449,608,456,592,497,580,478,566,470,543,451,488,454,458,409,428,426,412,406,394,452,376,413,360,422,344,383,324,405,310,383,294,401,276,372,268,372,249,388,240,348,227,375,187,345,182,352,154,329,149,334,128,309,108,307,85,292,73,293,27,268,57',
  ];

  defOpt: IOptTree = {
    tree: '/assets/tree/1.png',
    bcg: '/assets/bg/1.jpg',
    lights: false,
    snowflake: false,
    sound: false,
    colorLights: 'multicolor',
  };

  opt: IOptTree;

  constructor() {
    this.favoritesBolls = document.querySelector('.favorites-bolls');
    this.christmasTree = document.querySelector('.christmas-tree');
    this.selectTree = document.querySelector('.christmas-trees');
    this.selectBcg = document.querySelector('.background');
    this.container = document.querySelector('.tree');
    this.mapTree = document.querySelector('map');
    this.snowflakeContainer = document.querySelector('.snowflake-container');
    this.btnSnowflake = document.querySelector('.btn-snowflake');
    this.btnSound = document.querySelector('.btn-sound');
    this.lightsContainer = document.querySelector('.lights-container');
    this.toggleLight = document.querySelector('.toggle-light');
    this.radioColorLights = document.querySelectorAll('input[name="light"]');
    this.btnResetSettings = document.querySelector('.btn-reset-tree');
    this.createSnowFlake = this.createSnowFlake.bind(this);
  }

  renderCards(cards: IData[]) {
    let html = '';
    cards.forEach((card, index) => {
      html += `<div class="card-boll" data-num="${index + 1}">`;
      for (let i = 1; i <= Number(card.count); i += 1) {
        html += `<img class="img-toys" id="${index + 1}-${i}" data-imgnum="${
          index + 1
        }" src="./assets/toys/${card.num}.png" alt="toys" />`;
      }
      html += `<span>${card.count}</span></div>`;
    });
    this.favoritesBolls.innerHTML = html;
    const imgToys = document.querySelectorAll('.img-toys');
    imgToys.forEach((img) => {
      img.addEventListener('dragstart', this.dragStart);
      img.addEventListener('dragend', this.dragEnd.bind(this));
    });
  }

  countToys(card: Element) {
    const count = card.querySelector('span');
    count.textContent = String(card.querySelectorAll('img').length);
  }

  getCardToys(img: HTMLElement): Element {
    const imgNum = img.dataset.imgnum;
    const card = document.querySelector(`.card-boll[data-num="${imgNum}"]`);
    return card;
  }

  dragStart(event: DragEvent) {
    event.dataTransfer.setData('id', (event.target as HTMLElement).id);
  }

  dragEnd(event: DragEvent) {
    if (event.dataTransfer.dropEffect === 'none') {
      const toy = event.target as HTMLElement;
      toy.removeAttribute('style');
      const card = this.getCardToys(toy);
      card.appendChild(toy);
      this.countToys(card);
    }
  }

  drop(event: DragEvent) {
    const toyId = event.dataTransfer.getData('id');
    const toy = document.getElementById(toyId);
    const coordsTree = this.getCoords(this.christmasTree);
    toy.style.left = `${event.pageX - coordsTree.left}px`;
    toy.style.top = `${event.pageY - coordsTree.top}px`;
    if (toy.closest('.card-boll')) {
      this.mapTree.append(toy);
      this.countToys(this.getCardToys(toy));
    }
  }

  getCoords(elem: HTMLElement) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + window.scrollY,
      left: box.left + window.scrollX,
    };
  }

  clearTree() {
    this.mapTree.querySelectorAll('.img-toys').forEach((toy) => {
      toy.remove();
    });
  }

  setBcg(event: Event) {
    const target = event.target as HTMLElement;
    this.addActive(target.closest('.select-bcg'), 'bcg');
  }

  setTree(event: Event) {
    const target = event.target as HTMLElement;
    this.addActive(target.closest('.select-tree'), 'tree');
  }

  setMap(url: string) {
    const indexMap = Number(url.slice(-5, -4)) - 1;
    this.mapTree.querySelector('area').coords = this.map[indexMap];
  }

  createSnowFlake() {
    const snowFlake = document.createElement('i');
    snowFlake.classList.add('material-icons');
    snowFlake.classList.add('snow');
    snowFlake.textContent = 'ac_unit';
    snowFlake.style.left = `${Math.random() * window.innerWidth}px`;
    snowFlake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowFlake.style.opacity = `${Math.random()}`;
    snowFlake.style.fontSize = `${Math.random() * 10 + 10}px`;
    this.snowflakeContainer.appendChild(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }

  sound() {
    if (this.audio.paused) {
      this.opt.sound = true;
      this.audio.play();
    } else {
      this.opt.sound = false;
      this.audio.pause();
    }
  }

  startPlay() {
    if (this.opt.sound) {
      this.audio.play();
    }
  }

  applySettings() {
    this.selectBcg
      .querySelector(`a[data-url="${this.opt.bcg}"]`)
      .classList.add('active');
    this.selectTree
      .querySelector(`a[data-url="${this.opt.tree}"]`)
      .classList.add('active');
    this.container.style.backgroundImage = `url(${this.opt.bcg})`;
    this.christmasTree.src = this.opt.tree;
    this.setMap(this.opt.tree);
    this.audio.loop = true;
    if (this.opt.snowflake) {
      this.timerID = setInterval(this.createSnowFlake, 50);
    }
    if (this.opt.lights) {
      this.toggleLight.checked = true;
      this.renderLights(this.opt.colorLights);
    }
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
        this.setMap(url);
        this.christmasTree.src = url;
      }
      this.opt[key] = url;
    }
  }

  renderLights(color: string) {
    let html = '';
    let numberLightBulbs = 3;
    const numberLayers = 8;
    const iterator = 3;
    for (let i = 1; i <= numberLayers; i += 1) {
      html += '<ul class="light-rope">';
      for (let t = 0; t < numberLightBulbs; t += 1) {
        html += `<li class="${color}"></li>`;
      }
      html += '</ul>';
      numberLightBulbs += iterator;
    }
    this.lightsContainer.innerHTML = html;
  }

  showLights() {
    if (this.opt.lights) {
      this.renderLights(this.opt.colorLights);
    } else {
      this.lightsContainer.innerHTML = '';
    }
  }

  setColorLights(event: Event) {
    this.opt.colorLights = (event.target as HTMLInputElement).value;
    this.showLights();
  }

  events() {
    this.selectBcg.addEventListener('click', this.setBcg.bind(this));
    this.selectTree.addEventListener('click', this.setTree.bind(this));
    this.mapTree.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    this.mapTree.addEventListener('drop', this.drop.bind(this));
    this.btnSnowflake.addEventListener('click', () => {
      if (!this.opt.snowflake) {
        this.opt.snowflake = true;
        this.timerID = setInterval(this.createSnowFlake, 50);
      } else {
        this.opt.snowflake = false;
        clearTimeout(this.timerID);
      }
    });
    this.btnSound.addEventListener('click', this.sound.bind(this));
    this.toggleLight.addEventListener('change', (event: Event) => {
      this.opt.lights = (event.target as HTMLInputElement).checked;
      this.showLights();
    });
    this.radioColorLights.forEach((radio) => {
      radio.addEventListener('change', this.setColorLights.bind(this));
      if ((radio as HTMLInputElement).value === this.opt.colorLights) {
        const color = radio as HTMLInputElement;
        color.checked = true;
      }
    });
    this.btnResetSettings.addEventListener('click', LocalStorage.resetLS);
    window.addEventListener(
      'beforeunload',
      LocalStorage.setLS.bind(this, 'optTree', this.opt, this.btnResetSettings)
    );
    document.addEventListener('click', this.startPlay.bind(this), {
      once: true,
    });
  }

  init() {
    this.opt = LocalStorage.getLS('optTree', this.defOpt);
    this.events();
    this.applySettings();
  }
}

export default Tree;
