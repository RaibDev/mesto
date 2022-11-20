const initialCards = [   //  Массив дефолтных значений карточек
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

//  Кнопки открытия попапов

const addCardButton = document.querySelector('.add-button');
const editFormButton = document.querySelector('.edit-button');

//  Кнопки закрытия попапов

const closeFormButton = document.querySelector('.close-button'); 
const closePlaceButton = document.querySelector('.close-place-btn');
const closeImageButton = document.querySelector('.close-image-btn');

//  Записали попапы в переменные

const popupActive = document.querySelector('.popup');
const popupPlaceActive = document.querySelector('.popup-cards');
const popupImageActive = document.querySelector('.popup-img')

//  Создали переменные для обращени к полям форм

const formElement = document.querySelector('.popup__form');
const createFormElement = document.querySelector('.popup__form_type_create');

//  Фиксируем инпуты в переменные для обращения к ним

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');

const galleryContainer = document.querySelector('.gallery');



const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
/*const placeText = document.querySelector('.place__text');
const placeImage = document.querySelector('.place__image'); */

//  Переменные для работы попапа картинки

const titlePopupImage = document.querySelector('.popup-img__title');
const sourcePopupImage = document.querySelector('.popup-img__item');


const popupOpen = button => {                      //  Функция открытия попапа
  button.classList.add('popup_active');
}

const popupClose = button => {                  //  Функция закрытия попапа
  button.classList.remove('popup_active');
}

const formSubmitHandler = event => {     //  Функция сохранения значений формы редактирования профиля
  event.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  popupClose(popupActive);
}

const deleteButton = event => {           // функция удаления карточки
  event.target.closest('.place').remove();
}

const placeTemplate = document.querySelector('#new-card').content.querySelector('.place');   // Создаем шаблон добавления содержимого тега template

//  Добавляем карточки из массива

const generateNewCard = cardDate => {
  const newPlaceCard = placeTemplate.cloneNode(true);  //копируем тег template
  
  const title = newPlaceCard.querySelector('.place__text');
  title.textContent = cardDate.name;  // задаем название места

  const link = newPlaceCard.querySelector('.place__image');
  link.setAttribute('src', cardDate.link);  //задаем src картинке

  const deleteCardButton = newPlaceCard.querySelector('.delete-card-btn');  
  deleteCardButton.addEventListener('click', deleteButton); //  здесь удаляем

  link.addEventListener('click', () => {   //  Событие клика по картинке и открытие попапа с заданным параметрами
    popupOpen(popupImageActive);

    titlePopupImage.textContent = cardDate.name;
    sourcePopupImage.setAttribute('src', cardDate.link);
  })

  return newPlaceCard;
}

const addCard = cardDate => {                           // Добавляем карточки из формы 
  galleryContainer.prepend(generateNewCard(cardDate));
}

initialCards.forEach(cardDate => {                   //  Генерируем карточки
  addCard(cardDate);
});

/*const handlerLiked = (event) => {                                                   Здесь target работает только на кнопку лайка первой карточки
  event.target.closest('.place__button').classList.toggle('place__button_active');
  console.log(event)
} */

closeFormButton.addEventListener('click', () => {
  popupClose(popupActive);
});

closePlaceButton.addEventListener('click', () => {
  popupClose(popupPlaceActive);
});

addCardButton.addEventListener('click', () => {  //  Открытие попапа добавления карточки
  popupOpen(popupPlaceActive);
});

const handlerAddCard = evt => {
  evt.preventDefault();
 /* const newPlaceCard = placeTemplate.cloneNode(true);

  const placeText = newPlaceCard.querySelector('.place__text');
  const placeImage = newPlaceCard.querySelector('.place__image');

  const title = newPlaceCard.querySelector('.place__text');
  title.textContent = titleInput.value;  // задаем название места

  const link = newPlaceCard.querySelector('.place__image');
  link.setAttribute('src', linkInput.value);  */

 /* popupClose(popupPlaceActive); */
  addCard({name: titleInput.value, link: linkInput.value});
  titleInput.value = '';
  linkInput.value = '';
  popupClose(popupPlaceActive);
  /*findLikeButton();*/
};               

createFormElement.addEventListener('submit', handlerAddCard);        // Слушатель сабмита формы добавления

editFormButton.addEventListener('click', () => { //  Открытие редактирования и подстановка дефолтных значений
  popupOpen(popupActive);

  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}); 

/*function openEditForm() {
  let popupActive = document.querySelector('.popup');
  popupActive.classList.add('popup_active'); 
};*/

const findLikeButton = () => {
const likeButtons = document.querySelectorAll('.place__button');  //Лайк на карточке завязан через цикл, иначе кликается только кнопка в первой карточке
likeButtons.forEach((button) => {
  const likeButton = button.closest('.place__button');            //  Осознанно допускаю ошибку. Буду думать насчет работы не с изначальным массивом,
  button.addEventListener('click', () => {                        //  а с массивом из всех элементов
    likeButton.classList.toggle('place__button_active');
  });
}); 
};

findLikeButton();

formElement.addEventListener('submit', formSubmitHandler);  // Слушатель на сабмит профиля

closeImageButton.addEventListener('click', () => {  // Закрытие попапа картинки
  popupClose(popupImageActive);
})