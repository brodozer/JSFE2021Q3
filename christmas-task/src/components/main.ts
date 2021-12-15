import Modal from './modal';
import Toys from './toys';

class Main {
  modal: Modal;

  toys: Toys;

  pageHome: HTMLElement;

  pageToys: HTMLElement;

  pageTree: HTMLElement;

  linkHome: HTMLElement;

  linkToys: HTMLElement;

  linkTree: HTMLElement;

  btnStartGame: HTMLElement;

  constructor(modal: Modal, toys: Toys) {
    this.modal = modal;
    this.toys = toys;
    this.pageHome = document.querySelector('.home');
    this.pageToys = document.querySelector('.toys');
    this.pageTree = document.querySelector('.tree');
    this.linkHome = document.querySelector('.link-home');
    this.linkToys = document.querySelector('.link-toys');
    this.linkTree = document.querySelector('.link-tree');
    this.btnStartGame = document.querySelector('.btn-start-game');
  }

  classToggle(hide: HTMLElement, show: HTMLElement, className: string) {
    hide.classList.add(className);
    show.classList.remove(className);
  }

  events() {
    this.btnStartGame.addEventListener('click', () => {
      this.pageHome.style.transform = 'translateY(-100%)';
      this.modal.unlockScroll();
    });
    this.linkHome.addEventListener('click', () => {
      this.modal.lockScroll();
      this.pageHome.style.transform = 'translateY(0)';
    });
    this.linkToys.addEventListener('click', () => {
      this.classToggle(
        this.linkToys.closest('li'),
        this.linkTree.closest('li'),
        'active'
      );
      this.classToggle(this.pageTree, this.pageToys, 'hide');
    });
    this.linkTree.addEventListener('click', () => {
      // this.tree.init(this.toys.getFavorites());
      this.classToggle(
        this.linkTree.closest('li'),
        this.linkToys.closest('li'),
        'active'
      );
      this.classToggle(this.pageToys, this.pageTree, 'hide');
    });
  }

  init() {
    this.modal.lockScroll();
    this.events();
    this.toys.init();
  }
}

export default Main;
