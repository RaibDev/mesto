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

const displayInputErrorText = (formElement, inputElement, errorText) => {        //  Показать ошибку при вводе
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectorsCollection.inputErrorClass);
  errorElement.textContent = errorText;
  errorElement.classList.add(selectorsCollection.errorClass);
};

const eraseInputErrorText = (formElement, inputElement) => {          //  Убрать ошибку при вводе
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectorsCollection.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(selectorsCollection.errorClass);
  ;
};

const isInputValid = (formElement, inputElement) => {                    //  Проверялет поле на валидность
  if (!inputElement.validity.valid) {
    displayInputErrorText(formElement,inputElement, inputElement.validationMessage);
    } else {
      eraseInputErrorText(formElement,inputElement);
    }
};

const toggleButtonSubmitForms = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(selectorsCollection.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(selectorsCollection.inactiveButtonClass);
  }
};

const setEventListeners = (formElement) => {                                     //  Обработка полей переданной формы с добавлением этих полей в массив и перебор каждого элемента
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));  //   массива с добавлением слушателя ввода в поле и запуска проверки валидации на событие input в поле
  const buttonElement = formElement.querySelector(selectorsCollection.submitButtonSelector);
  toggleButtonSubmitForms(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isInputValid(formElement, inputElement);
      toggleButtonSubmitForms(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
};

const enableValidation = (selectorsCollection) => {                                                //  Поиск по документу имеющихся форм, добавление их в массив и дальнейший перебор каждого элемента массива
  const formList = Array.from(document.querySelectorAll(selectorsCollection.formSelector));       //  форм и вызов функции обработки полей

  formList.forEach((formElement) => {
      setEventListeners(formElement);
  });
};

enableValidation(selectorsCollection);                                                            //  Вызов функции поиска изменяемых форм с дальнейшим перебором изменяемых полей этих форм
