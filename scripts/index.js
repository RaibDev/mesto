//  Кнопки открытия попапов
import { Card, initialCards } from './Card.js';
import { FormValidation, selectorsCollection } from './FormValidator.js';

const addCardButton = document.querySelector('.add-button');
const editProfileButton = document.querySelector('.edit-button');

//  Кнопки закрытия попапов

const closeEditPopupButton = document.querySelector('.close-edit-btn'); 
const closeAddCardButton = document.querySelector('.close-place-btn');
const closeImagePopupButton = document.querySelector('.close-image-btn');

//  Записали попапы в переменные

const popups = document.querySelectorAll('.popup');
const popupProfileForm = document.querySelector('.popup-edit');
const popupAddPlaceForm = document.querySelector('.popup-cards');
export const popupBiggerImage = document.querySelector('.popup-img')

//  Создали переменные для обращени к полям форм

const popupForms = Array.from(document.querySelectorAll('.popup__form'));
const formEditElement = document.querySelector('.popup__form_type_edit');
const formCreateElement = document.querySelector('.popup__form_type_create');

//  Фиксируем инпуты в переменные для обращения к ним

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

const submitCreateFormBtn  = document.querySelector('.popup__button_type_create');

const galleryContainer = document.querySelector('.gallery'); 

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const editForm = document.querySelector('.popup__form_type_edit');
const addCardForm = document.querySelector('.popup__form_type_create');

const errorElements = Array.from(document.querySelectorAll('.popup__error'));

export const openPopup = popup => {                      //  Функция открытия попапа
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupToPressEscBtn);  //  Слушатель события закрытия попапа с клавиши
};

const closePopup = popup => {                  //  Функция закрытия попапа
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupToPressEscBtn);    //  Удаляем слушатель события закрытия попапа с клавиши
};

const resetPopupFormError = (popup) => {        
  if (!popup.classList.contains('popup-img')) {   
    popupForms.forEach((elem) => {
      elem.reset();
    });
  
    errorElements.forEach((elem) => {
      elem.textContent = '';
    });
  };
};

const setDisabledBtn = () => {
  submitCreateFormBtn.disabled = true;
  submitCreateFormBtn.classList.add('popup__button_disabled');
};

const saveEditFormHandler = event => {     //  Функция сохранения значений формы редактирования профиля
  event.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  closePopup(popupProfileForm);
};

const closePopupToPressEscBtn = (event) => {   //  функция для слушателя события ESC для закрытия попапа нажатием клавиши
  if (event.key === 'Escape') { 
    const popupActive = document.querySelector('.popup_active');
    closePopup(popupActive);
    resetPopupFormError(popupActive);
  };
};

const addCard = (data) => {  
  const card = new Card(data, '.card-template_type_place');                         // Добавляем карточки из формы 
  galleryContainer.prepend(card.generateCard());
};

const addCardHandler = evt => {
  evt.preventDefault();

  addCard({name: titleInput.value, link: linkInput.value});
  formCreateElement.reset();
  closePopup(popupAddPlaceForm);
  resetPopupFormError(popupAddPlaceForm);
};    

          //  Генерируем карточки 
initialCards.forEach((data) => {
  addCard(data);
});

closeEditPopupButton.addEventListener('click', () => { //  Обработчик клика по кнопке закрытия формы поля профиля
  closePopup(popupProfileForm);
  resetPopupFormError(popupProfileForm);
});

closeAddCardButton.addEventListener('click', () => {    //  Обработчик клика по кнопке закрытия формы новой карточки
  closePopup(popupAddPlaceForm);
  resetPopupFormError(popupAddPlaceForm);
});

addCardButton.addEventListener('click', () => {  //  Открытие попапа добавления карточки
  openPopup(popupAddPlaceForm);
  setDisabledBtn();
});           

formCreateElement.addEventListener('submit', addCardHandler);        // Слушатель сабмита формы добавления

editProfileButton.addEventListener('click', () => { //  Открытие редактирования и подстановка дефолтных значений
  openPopup(popupProfileForm);

  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}); 

formEditElement.addEventListener('submit', saveEditFormHandler);  // Слушатель на сабмит профиля

closeImagePopupButton.addEventListener('click', () => {  // Закрытие попапа картинки
  closePopup(popupBiggerImage);
});

popups.forEach(function (elem) {       //  Слушатель клика по оверлею
  elem.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(elem);
      resetPopupFormError(elem);
    }
  });
});

const editFormValidation = new FormValidation(selectorsCollection, editForm);
editFormValidation.enableValidation();    //  Запуск валидации формы редактирования

const addCardFormValidation = new FormValidation(selectorsCollection, addCardForm);
addCardFormValidation.enableValidation();  //  Запуск валидации формы добавления кароточки