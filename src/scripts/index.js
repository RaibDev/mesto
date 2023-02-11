import Card from './Card.js';
import FormValidation from './FormValidator.js';
import Section  from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import PopupAvatar from './PopupWithAvatar.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import { selectorsCollection, initialCards } from '../utils/components.js';
import Api from './Api.js';
import '../pages/index.css';

const addCardButton = document.querySelector('.add-button');
const editProfileButton = document.querySelector('.edit-button');

export const popupBiggerImage = document.querySelector('.popup-img')

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const editForm = document.querySelector('.popup__form_type_edit');
const addCardForm = document.querySelector('.popup__form_type_create');
const avatarForm = document.querySelector('.popup__form_type_avatar');

const editAvatarButton = document.querySelector('.profile__avatar');

const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');

const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '224c0bf1-3fa1-420b-9667-0b1a7afec2fe',
    'Content-Type': 'application/json'
  }
}

const api = new Api(configApi);

const popupUserForm = new PopupWithForm({ 
  selector: '.popup-edit',
  submitFormHandler: (formData) => {
    popupUserForm.showSaving(true, 'Сохранить');
    return api.changeUserInfo(formData).then((data) => {
      userInfo.setUserInfo(data);
      popupUserForm.close();
    })
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
      .finally(() => {
        popupCardForm.showSaving(false, 'Создать');
      })
  }
});

const popupAvatarForm = new PopupAvatar({
  selector: '.popup-avatar',
  submitFormHandler: (formData) => {
    popupAvatarForm.showSaving(true, 'Создать');
    return api.changeUserAvatar(formData).then((data) => {
      userInfo.setAvatar(data);
      popupAvatarForm.close()
    })
      .finally(() => {
        popupAvatarForm.showSaving(false, 'Создать');
      })
  }
})

const bigImagePopup = new PopupWithImage('.popup-img');

const popupConfirmation = new PopupWithConfirmation({
  selector: '.popup-delete',
  handlerFormConfirmation: (id) => {
    return api.deleteCard(id).then(() => {

    })
      .finally(() => {
        popupConfirmation.close();
      })
  }
})

const confirmDeleting = (obj) => {
  popupConfirmation.open();
  popupConfirmation.getDeletingId(obj);
}

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
    handleDeleteCard: () => {
      confirmDeleting(data);
      card.deleteCard();
      // popupConfirmation.open(id);
      // return api.deleteCard(id).then(() => {
      //   card.deleteCard();
      // })
      // .finally(() => {
      //   popupConfirmation.close();
      // })
    },
    handleLikeCard: (id) => {
      return api.likeCard(id).then((data) => {
        card.likeCard();
        card.getLikeNunmer(data);
      })
    },
    handleDislikeCard: (id) => {
      return api.dislikeCard(id).then((data) => {
        card.likeCard();
        card.getLikeNunmer(data);
      })
    }
  }, '.card-template_type_place');
  const cardItem = card.generateCard();
  
  return cardItem;
}

const addCard = (data) => {
  newCard.addItem(createCard(data));
}
  const newCard = new Section({
    // items: initialCards,
    renderer: (data, userId) => {
      // data.forEach(item => { addCard(item) })
      newCard.addItem(createCard(data, userId))
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

  // const userInfoObj = userInfo.getUserInfo();
  // nameInput.value = userInfoObj.name;
  // jobInput.value = userInfoObj.info;
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

// const getInitialCards = () => {
//   return api.getInitialCards().then((data) => {  //   Инициализация массива карточек с сервера и добаление их на страницу
//   data.forEach((dataElem) => {
//     addCard(dataElem);
//   })
// })
// };

// getInitialCards();

// const getUserInfo = () => {
//   return api.getUserInfo().then((data) => {
//   userInfo.setUserInfo(data);
//   userId = data._id;
// })
// };

// getUserInfo();

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([data, user]) => {
    userId = user._id;
    data.forEach((dataElem) => {
      // addCard(dataElem);
      newCard.renderItems(dataElem, userId);
   });
  //  userId = user._id;
   console.log(userId)
   userInfo.setUserInfo(user)
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {})

  let userId;