import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, submitFormHandler }) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputsObj = {};
    this._inputList.forEach(input => { this._inputsObj[input.name] = input.value });
    return this._inputsObj;
  }

  setEventListeners() {
    super.setEventListeners();
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