import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ data }, selector) {
    super(selector);
    this._name = data.name;
    this._link = data.link;
  }

  setEventListeners() {
    super._setEventListeners();
  }

  open() {
    const imageItem = this._popup.querySelector('.popup-img__item');
    imageItem.src = this._link;
    imageItem.alt = this._name;

    const imageTitle = this._popup.querySelector('.popup-img__title');
    imageTitle.textContent = this._name;

    super.open();
  }
}