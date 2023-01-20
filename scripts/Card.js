export class Card { 
  constructor( {data, openPopupImg}, templateSelector ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this.openPopupImg = openPopupImg;
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

  this._imageCard.addEventListener('click', () => { this.openPopupImg(this._name, this._link) });
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


