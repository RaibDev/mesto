export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  _handleEscClose(event) {
    if(event.key === 'Escape'){
      this.close();
    }
  }

  _setEventListeners() {
    const closeButton = this._popup.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });
    
    this._popup.addEventListener('mousedown', (event) => {
      if(event.target === event.currentTarget) {
        this.close();
      }
    })
  }

  open() {
    this._popup.classList.add('popup_active');
    // this._setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_active');
  }
}