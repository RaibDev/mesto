let editFormButton = document.querySelector('.edit-button');
let closeFormButton = document.querySelector('.close-button');
let popupActive = document.querySelector('.popup');

closeFormButton.addEventListener('click', () => {  
  popupActive.classList.remove('popup_active');
});

editFormButton.addEventListener('click', () => {  // функция не переиспользуется, поэтому - стрелочная 
  popupActive.classList.add('popup_active');
}); 

/*function openEditForm() {
  let popupActive = document.querySelector('.popup');
  popupActive.classList.add('popup_active'); 
};*/
/*
let likeButton = document.querySelector('.place__button');
likeButton.addEventListener('click', () => {
  likeButton.classList.add('place__button_active');
});
*/

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let profileName = document.querySelector('.profile__name');
  let profileProfession = document.querySelector('.profile__profession');
  
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  popupActive.classList.remove('popup_active');
}

formElement.addEventListener('submit', formSubmitHandler);