import { openPopup, popupBiggerImage } from './index.js';

export const initialCards = [   //  Массив дефолтных значений карточек
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export class Card { constructor(data, templateSelector) {
  this._name = data.name;
  this._link = data.link;
  this._templateSelector = templateSelector;
}

_getTemplate() {                    //   Создаем шаблон для заполнения карточки
  const cardElement = document
  .querySelector(this._templateSelector)
  .content
  .querySelector('.place')
  .cloneNode(true);

  return cardElement;
}

_setEventListeners() {               //  Обозначаем обработчики
  const deleteButton = this._element.querySelector('.delete-card-btn');
  deleteButton.addEventListener('click', () => { this._deleteCard() });

  this._likeButton = this._element.querySelector('.place__button');
  this._likeButton.addEventListener('click', () => { this._likeCard() });

  this._imageCard.addEventListener('click', () => { this._openBigImage() });
}

_deleteCard() {                      //  Удаляем карточку
  this._element.remove();
  this._element = null;
}

_likeCard() {                       //   Лайкаем карточку
  this._likeButton.classList.toggle('place__button_active');
}

_setPopupData() {                  //    Заполняем попап крупной картинки
    const popupImageTitle = document.querySelector('.popup-img__title');
    popupImageTitle.textContent = this._name;

    const popupImageItem = document.querySelector('.popup-img__item');
    popupImageItem.alt = this._name;
    popupImageItem.src = this._link;
}

_openBigImage() {                 //    Открываем попап крупной картинки
  openPopup(popupBiggerImage);
  this._setPopupData();
}

_setData() {                      //   Заполнение полей новой карточки
  const titleCard = this._element.querySelector('.place__text');
  titleCard.textContent = this._name;

  this._imageCard = this._element.querySelector('.place__image');
  this._imageCard.alt = this._name;
  this._imageCard.src = this._link;
}

generateCard() {                 //   Публтчный метод генерации карточки
  this._element = this._getTemplate();
  this._setData();
  this._setEventListeners();

  return this._element;
}
};


