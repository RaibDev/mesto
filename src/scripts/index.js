import Card from './Card.js';
import FormValidation from './FormValidator.js';
import Section  from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import { selectorsCollection, initialCards } from './data.js';
import '../pages/index.css';

const addCardButton = document.querySelector('.add-button');
const editProfileButton = document.querySelector('.edit-button');

export const popupBiggerImage = document.querySelector('.popup-img')

// const formCreateElement = document.querySelector('.popup__form_type_create');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const editForm = document.querySelector('.popup__form_type_edit');
const addCardForm = document.querySelector('.popup__form_type_create');

const userInfo = new UserInfo('.profile__name', '.profile__profession');

const popupUserForm = new PopupWithForm({ 
  selector: '.popup-edit',
  submitFormHandler: (formData) => {
    userInfo.setUserInfo(formData);
  }   
});

const popupCardForm = new PopupWithForm({
  selector: '.popup-cards',
  submitFormHandler: (formData) => {
    addCard(formData);
  }
});

popupUserForm.setEventListeners();
popupCardForm.setEventListeners();

const addCard = (data) => {
  const card = new Card({
    data,
    openPopupImg: () => {
      const bigImagePopup = new PopupWithImage({ data }, '.popup-img');
      bigImagePopup.open();
      bigImagePopup.setEventListeners();
    }
  }, '.card-template_type_place');
  const cardItem = card.generateCard();
  newCard.addItem(cardItem);
  return card;
}
  const newCard = new Section({
    items: initialCards,
    renderer: (data) => {
      data.forEach(item => { addCard(item) })
    }
  }, '.gallery');
  newCard.renderItems();

addCardButton.addEventListener('click', () => {  //  Открытие попапа добавления карточки
  popupCardForm.open();

  // addCardForm.reset();
  addCardFormValidation.resetErrors();
  addCardFormValidation.disableSubmitButton();
});           

editProfileButton.addEventListener('click', () => { //  Открытие редактирования и подстановка дефолтных значений
  popupUserForm.open();

  editFormValidation.resetErrors();
  editFormValidation.disableSubmitButton();

  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}); 

const editFormValidation = new FormValidation(selectorsCollection, editForm);
editFormValidation.enableValidation();    //  Запуск валидации формы редактирования

const addCardFormValidation = new FormValidation(selectorsCollection, addCardForm);
addCardFormValidation.enableValidation();  //  Запуск валидации формы добавления кароточки

