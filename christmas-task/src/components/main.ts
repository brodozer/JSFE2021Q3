import Modal from './modal';
import Toys from './toys';
import Tree from './tree';

class Main {
  modal: Modal;

  toys: Toys;

  tree: Tree;

  btnStartGame: HTMLElement;

  curPage = '/';

  pages = [
    {
      path: '/',
      page: document.querySelector('.home'),
      btn: document.querySelector('.link-home'),
    },
    {
      path: '/toys',
      page: document.querySelector('.toys'),
      btn: document.querySelector('.link-toys'),
    },
    {
      path: '/tree',
      page: document.querySelector('.tree'),
      btn: document.querySelector('.link-tree'),
    },
  ];

  constructor(modal: Modal, toys: Toys, tree: Tree) {
    this.modal = modal;
    this.toys = toys;
    this.tree = tree;
    this.btnStartGame = document.querySelector('.btn-start-game');
  }

  classToggle(hide: HTMLElement, show: HTMLElement, className: string) {
    hide.classList.add(className);
    show.classList.remove(className);
  }

  openPath(event: Event) {
    event.preventDefault();
    const { path } = (event.target as HTMLElement).closest('a').dataset;
    if (path !== this.curPage) {
      this.pages.forEach((page) => {
        if (page.path === this.curPage) {
          page.btn.classList.remove('active');
          page.page.classList.add('hide');
          if (page.path === '/tree') {
            this.tree.clearTree();
          }
        } else if (page.path === path) {
          page.btn.classList.add('active');
          page.page.classList.remove('hide');
          if (path === '/tree') {
            this.tree.renderCards(this.toys.getFavorites());
          }
        }
      });
      this.curPage = path;
    }
  }

  events() {
    this.pages.forEach((page) => {
      page.btn.addEventListener('click', this.openPath.bind(this));
    });
    this.btnStartGame.addEventListener('click', this.openPath.bind(this));
  }

  init() {
    this.events();
    this.toys.init();
    this.tree.init();
  }
}

export default Main;
