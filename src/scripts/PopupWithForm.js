import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, submitFormHandler }) {
    super(selector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    this._inputsObj = {};
    this._inputList.forEach(input => { this._inputsObj[input.name] = input.value });
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
      // this.close();
    })
  }
  
  close() {
    super.close();
    this._form.reset();
  }

}