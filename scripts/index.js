//  Кнопки открытия попапов

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
const popupBiggerImage = document.querySelector('.popup-img')

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

//  Переменные для работы попапа картинки

const popupImageTitle = document.querySelector('.popup-img__title');
const popupImageItem = document.querySelector('.popup-img__item');

const placeTemplate = document.querySelector('#new-card').content.querySelector('.place');   // Создаем шаблон добавления содержимого тега template

const errorElements = Array.from(document.querySelectorAll('.popup__error'));

const openPopup = popup => {                      //  Функция открытия попапа
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

const deleteCard = event => {           // функция удаления карточки
  event.target.closest('.place').remove();
};

const closePopupToPressEscBtn = (event) => {   //  функция для слушателя события ESC для закрытия попапа нажатием клавиши
  if (event.key === 'Escape') { 
    const popupActive = document.querySelector('.popup_active');
    closePopup(popupActive);
    resetPopupFormError(popupActive);
  };
};

//  Добавляем карточки из массива

const generateNewCard = dataCard => {
  const newPlaceCard = placeTemplate.cloneNode(true);  //копируем тег template
  
  const title = newPlaceCard.querySelector('.place__text');
  title.textContent = dataCard.name;  // задаем название места

  const image = newPlaceCard.querySelector('.place__image');
  image.setAttribute('src', dataCard.link);  //задаем src картинке
  image.setAttribute('alt', dataCard.name);

  const deleteCardButton = newPlaceCard.querySelector('.delete-card-btn');  
  deleteCardButton.addEventListener('click', deleteCard);                   //  здесь удаляем

  const likeCardHandler = (event) => {                                      //  добавляем/удаляем лайк 
    event.target.closest('.place__button').classList.toggle('place__button_active');
  };

  const likeCardButton = newPlaceCard.querySelector('.place__button');
  likeCardButton.addEventListener('click', likeCardHandler); //  Событие клика по лайку карточки

  image.addEventListener('click', () => {   //  Событие клика по картинке и открытие попапа с заданным параметрами
    openPopup(popupBiggerImage);

    popupImageTitle.textContent = dataCard.name;
    popupImageItem.setAttribute('src', dataCard.link);
    popupImageItem.setAttribute('alt', dataCard.name);
  });

  return newPlaceCard;
};

const addCard = dataCard => {                           // Добавляем карточки из формы 
  galleryContainer.prepend(generateNewCard(dataCard));
};

const addCardHandler = evt => {
  evt.preventDefault();

  addCard({name: titleInput.value, link: linkInput.value});
  formCreateElement.reset();
  closePopup(popupAddPlaceForm);
  resetPopupFormError(popupAddPlaceForm);
};    

initialCards.forEach(addCard);                  //  Генерируем карточки 

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