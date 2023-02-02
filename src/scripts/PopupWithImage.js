import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor( selector) {
    super(selector);
    // this._name = data.name;
    // this._link = data.link;
    this._imageItem = this._popup.querySelector('.popup-img__item');
    this._imageTitle = this._popup.querySelector('.popup-img__title');
  }

  open({ data }) {
    this._imageItem.src = data.link;
    this._imageItem.alt = data.name;
    this._imageTitle.textContent = data.name;

    super.open();
  }
}