import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor({ selector}) {
    super(selector);
    // this._handlerFormConfirmation = handlerFormConfirmation;
    this._form = this._popup.querySelector('.popup__form');
  }

  // getDeletingId(obj) {
  //   this.id = obj._id;
  // }

  callbackDeleteFunction(func) {
    this._handlerFormConfirmation = func;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormConfirmation();
    })
  }
}