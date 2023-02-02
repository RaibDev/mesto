export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector('.close-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    if(event.key === 'Escape'){
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    
    this._popup.addEventListener('mousedown', (event) => {
      if(event.target === event.currentTarget) {
        this.close();
      }
    })
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}