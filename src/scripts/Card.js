export default class Card { 
  constructor( {data, openPopupImg}, templateSelector ) {
    // this._name = data.name;
    // this._link = data.link;
    this._data = data;
    this._templateSelector = templateSelector;
    this.openPopupImg = openPopupImg;
    this._element = this._getTemplate();
    this._imageCard = this._element.querySelector('.place__image');
    this._titleCard = this._element.querySelector('.place__text');
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
  this._deleteButton = this._element.querySelector('.delete-card-btn');
  this._deleteButton.addEventListener('click', () => { this._deleteCard() });

  this._likeButton = this._element.querySelector('.place__button');
  this._likeButton.addEventListener('click', () => { this._likeCard() });

  this._imageCard.addEventListener('click', () => { this.openPopupImg(this._data) });
}

_deleteCard() {                      //  Удаляем карточку
  this._element.remove();
  this._element = null;
  this._likeButton = null;
  this._imageCard = null;
}

_likeCard() {                       //   Лайкаем карточку
  this._likeButton.classList.toggle('place__button_active');
}

_setData() {                      //   Заполнение полей новой карточки
  this._titleCard.textContent = this._data.name;
  this._imageCard.alt = this._data.name;
  this._imageCard.src = this._data.link;
}

generateCard() {                 //   Публтчный метод генерации карточки
  this._setData();
  this._setEventListeners();

  return this._element;
}
};


