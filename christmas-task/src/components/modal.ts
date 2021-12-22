class Modal {
  body: HTMLElement;

  modal: HTMLElement;

  btnClose: HTMLElement;

  btnFilters: HTMLElement;

  btnSettings: HTMLElement;

  constructor() {
    this.modal = document.querySelector('.overlay');
    this.btnClose = this.modal.querySelector('.close');
    this.body = document.body;
    this.btnFilters = this.body.querySelector('.btn-filters');
    this.btnSettings = this.body.querySelector('.btn-settings');
    this.init();
  }

  lockScroll() {
    const scrollWidth = window.innerWidth - this.body.clientWidth;
    const scrollPosition = String(window.pageYOffset);
    this.body.dataset.positionY = scrollPosition;
    this.body.style.cssText = `
            position: fixed;
            top: -${scrollPosition}px;
            left: 0;
            overflow: hidden;
            width: 100%;
            height: 100vh;
            padding-right: ${scrollWidth}px;
        `;
  }

  unlockScroll() {
    this.body.style.cssText = '';
    window.scroll(0, Number(this.body.dataset.positionY));
  }

  modalOpen(event: Event) {
    this.modal.classList.remove('hide');
    this.lockScroll();
    const target = (event.target as HTMLElement).closest('.btn') as HTMLElement;
    const id = target.dataset.target;
    this.modal.dataset.target = id;
    document.getElementById(id).style.transform = 'translateX(0)';
  }

  modalClose = () => {
    this.modal.classList.add('hide');
    this.unlockScroll();
  };

  init() {
    this.modal.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains('overlay') ||
        target.closest('.btn-close') === this.btnClose
      ) {
        this.modalClose();
        const id = this.modal.dataset.target;
        document.getElementById(id).style.transform = 'translateX(-100%)';
      }
    });
    this.btnFilters.addEventListener('click', this.modalOpen.bind(this));
    this.btnSettings.addEventListener('click', this.modalOpen.bind(this));
  }
}

export default Modal;
