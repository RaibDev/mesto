export class FormValidation {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }

  _hasInvalidInput() {    //   Проверка списка полей на валидность
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _isInputValid(inputElement) {  //  Проверка поля на валидность
    if(!inputElement.validity.valid) {
      this._displayInputErrorText(inputElement);
    } else {
      this._eraseInputErrorText(inputElement);
    }
  }

  _toggleSubmitButtonState() {   //   Переключатель активности кнопки
    if(this._hasInvalidInput()) {
      this.disabledSubmitButton();
    } else {
      this._activedSubmitButton();
    }
  }

  _displayInputErrorText = (inputElement) => {  //  Показать ошибку инпута
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _eraseInputErrorText = (inputElement) => {   //  Скрыть ошибку инпута
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    
  }

  _setEventListeners() {    //   Установка обработчиков события 
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleSubmitButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isInputValid(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }

  resetErrors() {
    this._inputList.forEach( input => this._eraseInputErrorText(input) );
  }

  disabledSubmitButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _activedSubmitButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  enableValidation() {    //    Запуск валидации
    this._setEventListeners();
  }
};

