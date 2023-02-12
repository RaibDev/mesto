// import { data } from "browserslist";

export default class Card { 
  constructor( {data, userId, openPopupImg, handleDeleteCard, handleLikeCard, handleDislikeCard}, templateSelector ) {
    // this._name = data.name;
    // this._link = data.link;
    // this._id = data._id;
    this._data = data;
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this.openPopupImg = openPopupImg;
    this.handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleDislikeCard = handleDislikeCard;
    this._element = this._getTemplate();
    this._imageCard = this._element.querySelector('.place__image');
    this._titleCard = this._element.querySelector('.place__text');
    this._likeNumber = this._element.querySelector('.place__like-number');
    this._deleteButton = this._element.querySelector('.delete-card-btn');

}

_getTemplate() {                    //   Создаем шаблон для заполнения карточки
  const cardElement = document
  .querySelector(this._templateSelector)
  .content
  .querySelector('.place')
  .cloneNode(true);

  return cardElement;
}

_checkId() {
  if (this._userId === this._ownerId) {
    this._deleteButton.classList.add('delete-card-btn_active');
  }
}

_checkUserLike() {
  return this._data.likes.some((item) => {
    return item._id === this._userId
  })
}

_setEventListeners() {               //  Обозначаем обработчики
  this._deleteButton.addEventListener('click', () => { 
    this.handleDeleteCard(this._data);
  });

  this._likeButton = this._element.querySelector('.place__button');
  this._likeButton.addEventListener('click', () => { this._likeButton.classList.contains('place__button_active') ? this._handleDislikeCard(this._data._id) : this._handleLikeCard(this._data._id) });

  this._imageCard.addEventListener('click', () => { this.openPopupImg(this._data) });
}

deleteCard() {                      //  Удаляем карточку
  this._element.remove();
  this._element = null;
  this._likeButton = null;
  this._imageCard = null;
}

_checklikeCard() {                     //   Лайкаем карточку
  if(this._checkUserLike()) {
    this._handleLikeCard(this._data._id);
  } else {
    this._handleDislikeCard(this._data._id);
  }
  // this._likeButton.classList.toggle('place__button_active');
}

likeCard() {
  this._likeButton.classList.toggle('place__button_active');
  this.getLikeNunmer(this._data);
}

getLikeNunmer(data) {
  this._likeNumber.textContent = data.likes.length;
}

_setData() {                      //   Заполнение полей новой карточки
  this._titleCard.textContent = this._data.name;
  this._imageCard.alt = this._data.name;
  this._imageCard.src = this._data.link;
  this.getLikeNunmer(this._data);
  this._checkId();
}

generateCard() {                 //   Публтчный метод генерации карточки
  this._setData();
  this._setEventListeners();
  if(this._checkUserLike()) { this._likeButton.classList.add('place__button_active') };
  return this._element;
}
};


