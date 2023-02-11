import Popup from "./Popup.js";

export default class PopupAvatar extends Popup{
  constructor({ selector, submitFormHandler }) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button');
    this._input = this._form.querySelector('.popup__input');
  }

  _getInputValues() {
    this._inputsObj = {};
    this._inputsObj[this._input.name] = this._input.value;
    return this._inputsObj;
  }

  showSaving(status, text) {
    if(status) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = text;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormHandler(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}