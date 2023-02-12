import Card from '../scripts/Card.js';
import FormValidation from '../scripts/FormValidator.js';
import Section  from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/PopupWithConfirmation.js';
import { 
  selectorsCollection, 
  configApi,
  addCardButton,
  editProfileButton,
  popupBiggerImage,
  nameInput,
  jobInput,
  editForm,
  addCardForm,
  avatarForm,
  editAvatarButton,
  initialCards } from '../utils/components.js';
import Api from '../scripts/Api.js';
import './index.css';

const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');

const api = new Api(configApi);

const popupUserForm = new PopupWithForm({ 
  selector: '.popup-edit',
  submitFormHandler: (formData) => {
    popupUserForm.showSaving(true, 'Сохранить');
    return api.changeUserInfo(formData).then((data) => {
      userInfo.setUserInfo(data);
      popupUserForm.close();
    })
      .catch(err => console.log(err))
      .finally(() => {
        popupUserForm.showSaving(false, 'Сохранить');
      })
  }   
});

const popupCardForm = new PopupWithForm({
  selector: '.popup-cards',
  submitFormHandler: (formData) => {
    popupCardForm.showSaving(true, 'Создать');
    return api.addNewCard(formData).then((data) => {
      addCard(data);
      popupCardForm.close();
      })
        .catch(err => console.log(err))
        .finally(() => {
        popupCardForm.showSaving(false, 'Создать');
      })
  }
});

const popupAvatarForm = new PopupWithForm({     
  selector: '.popup-avatar',
  submitFormHandler: (formData) => {
    popupAvatarForm.showSaving(true, 'Создать');
    return api.changeUserAvatar(formData).then((data) => {
      userInfo.setAvatar(data);
      popupAvatarForm.close()
    })
      .catch(err => console.log(err))
      .finally(() => {
        popupAvatarForm.showSaving(false, 'Создать');
      })
  }
})

const bigImagePopup = new PopupWithImage('.popup-img');

const popupConfirmation = new PopupWithConfirmation({
  selector: '.popup-delete'
})

popupUserForm.setEventListeners();
popupCardForm.setEventListeners();
bigImagePopup.setEventListeners();
popupAvatarForm.setEventListeners();
popupConfirmation.setEventListeners();

const createCard = (data) => {
  const card = new Card({
    data,
    userId,
    openPopupImg: () => {
      bigImagePopup.open({ data });
    },
    handleDeleteCard: (id) => {
      popupConfirmation.open();  //  Открыли попап подтверждения
      popupConfirmation.callbackDeleteFunction(() => {  //  передали этот код аргументом в метод класса подтверждения и присвоили его методу-колбэку, который вызовем при сабмите
        return api.deleteCard(id).then(() => {          //  после сабмита в попапе подтверждения вызовется этот код с тем айдишником, который передали в колбэке при нажатии кнопки удаления
          popupConfirmation.close();
          card.deleteCard();
        })
        .catch(err => console.log(err))
      })
    },
    handleLikeCard: (id) => {
      return api.likeCard(id).then((data) => {
        card.likeCard();
        card.getLikeNunmer(data);
      })
      .catch(err => console.log(err));
    },
    handleDislikeCard: (id) => {
      return api.dislikeCard(id).then((data) => {
        card.likeCard();
        card.getLikeNunmer(data);
      })
      .catch(err => console.log(err));
    }
  }, '.card-template_type_place');
  const cardItem = card.generateCard();
  
  return cardItem;
}

const addCard = (data) => {
  newCard.addItem(createCard(data));
}
  const newCard = new Section({
    renderer: (data, userId) => {
      // data.forEach(item => { addCard(item) })
      newCard.addItem(createCard(data, userId));
    }
  }, '.gallery');
  // newCard.renderItems();

addCardButton.addEventListener('click', () => {  //  Открытие попапа добавления карточки
  popupCardForm.open();

  addCardFormValidation.resetErrors();
  addCardFormValidation.disableSubmitButton();
});           

editProfileButton.addEventListener('click', () => { //  Открытие редактирования и подстановка дефолтных значений
  popupUserForm.open();

  editFormValidation.resetErrors();
  editFormValidation.disableSubmitButton();

  const userInfoObj = userInfo.getUserInfo();
  nameInput.value = userInfoObj.name;
  jobInput.value = userInfoObj.info;
}); 

editAvatarButton.addEventListener('click', () => {
  popupAvatarForm.open();

  editAvatarFormValidation.resetErrors();
  editAvatarFormValidation.disableSubmitButton();
})

const editFormValidation = new FormValidation(selectorsCollection, editForm);
editFormValidation.enableValidation();    //  Запуск валидации формы редактирования

const addCardFormValidation = new FormValidation(selectorsCollection, addCardForm);
addCardFormValidation.enableValidation();  //  Запуск валидации формы добавления кароточки

const editAvatarFormValidation = new FormValidation(selectorsCollection, avatarForm);
editAvatarFormValidation.enableValidation();

Promise.all([api.getInitialCards(), api.getUserInfo()]) //   Инициализация массива карточек с сервера и добаление их на страницу, Добавление в профель информации польователя
  .then(([data, user]) => {
    userId = user._id;
    data.reverse().forEach((dataElem) => {
      // addCard(dataElem);
      newCard.renderItems(dataElem, userId);
   });
   userInfo.setUserInfo(user)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {})

  let userId;