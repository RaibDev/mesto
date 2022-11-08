const editFormButton = document.querySelector('.edit-button');
const closeFormButton = document.querySelector('.close-button');
const popupActive = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

function closeEditForm() {
  popupActive.classList.remove('popup_active');
}

closeFormButton.addEventListener('click', closeEditForm);

editFormButton.addEventListener('click', () => { 
  popupActive.classList.add('popup_active');

  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
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

function formSubmitHandler(evt) {
  evt.preventDefault();
  
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;

  closeEditForm();
}

formElement.addEventListener('submit', formSubmitHandler);