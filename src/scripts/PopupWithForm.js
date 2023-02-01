import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, submitFormHandler }) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
  }

  _getInputValues() {
    this._inputsObj = {};
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._inputs.forEach((input) => { 
      this._inputsObj[input.name] = input.value 
    });
    return this._inputsObj;
  }

  setEventListeners() {
    super._setEventListeners();
    this._form = this._popup.querySelector('.popup__form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}