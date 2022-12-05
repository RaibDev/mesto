// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const selectorsCollection =  {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const displayInputErrorText = (formElement, inputElement, errorText, settings) => {        //  Показать ошибку при вводе
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorText;
  errorElement.classList.add(settings.errorClass);
};

const eraseInputErrorText = (formElement, inputElement, settings) => {          //  Убрать ошибку при вводе
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
  ;
};

const isInputValid = (formElement, inputElement, settings) => {                    //  Проверялет поле на валидность
  if (!inputElement.validity.valid) {
    displayInputErrorText(formElement,inputElement, inputElement.validationMessage, settings);
    } else {
      eraseInputErrorText(formElement,inputElement, settings);
    }
};

const toggleButtonSubmitForms = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {                                     //  Обработка полей переданной формы с добавлением этих полей в массив и перебор каждого элемента
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));  //   массива с добавлением слушателя ввода в поле и запуска проверки валидации на событие input в поле
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonSubmitForms(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isInputValid(formElement, inputElement, settings);
      toggleButtonSubmitForms(inputList, buttonElement, settings);
    });
  });
};

const hasInvalidInput = (inputList) => {    //  Проверка на валидность списка полей
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
};

const enableValidation = (settings) => {                                                //  Поиск по документу имеющихся форм, добавление их в массив и дальнейший перебор каждого элемента массива
  const formList = Array.from(document.querySelectorAll(settings.formSelector));       //  форм и вызов функции обработки полей

  formList.forEach((formElement) => {
      setEventListeners(formElement,settings);
  });
};

enableValidation(selectorsCollection);                                                            //  Вызов функции поиска изменяемых форм с дальнейшим перебором изменяемых полей этих форм
