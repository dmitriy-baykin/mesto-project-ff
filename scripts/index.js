const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector('.popup__image');
const popupCloseI = document.querySelector('.popup__closei');
//тянем данные их HTML
const popupCloseE = document.querySelector('.popup__closee');
const popupCloseA = document.querySelector('.popup__closea');
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileEditTarget = document.querySelector('.profile__edit-button');


const jobInput = document.querySelector('.popup__input_type_description');
const nameInput = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElementEditProfile = document.forms['edit-profile'];

const formAddNewCard = document.forms['new-place'];
const inputNewCardName = formAddNewCard.elements['place-name'];
const inputNewCardUrl = formAddNewCard.elements['link'];
const popupTypeCard = document.querySelector(".popup_type_new-card");
const profileAddCards = document.querySelector('.profile__add-button');

function createCard(
  data,
  deleteHandler,
  likeHandler,
  zoomHandler
) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true),
      cardDeleteBtn = cardElement.querySelector('.card__delete-button'),
      cardLikeBtn = cardElement.querySelector(".card__like-button"),
      cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = data.name;
  Object.assign(cardImage, { src: data.link, alt: data.name });

  cardDeleteBtn.addEventListener("click", () => deleteHandler(cardElement));
  cardLikeBtn.addEventListener("click", (e) => likeHandler(cardLikeBtn));
  cardImage.addEventListener("click", () => zoomHandler(data));

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function likeCard(btn) {
  btn.classList.toggle('card__like-button_is-active');
}
function openModalImg(card) {
  openModal(popupTypeImage);
  Object.assign(popupImage, {src: card.link, alt: card.name});
  popupCaption.textContent = card.name;
}


function editCardSubmit(e) {
  e.preventDefault();
  const obj = {name: e.target.place.value, link: e.target.link.value},
      card = createCard(obj, deleteCard, likeCard, openModalImg);
  cardContainer.prepend(card);
  formNewPlace.reset();
  closeModal(profileAddCards);
}

function renderCards() {
  initialCards.forEach(cardContent =>
      cardContainer.append(createCard(cardContent, deleteCard, likeCard, openModalImg))
  );
}

renderCards();





// открытие
function openModal(modal) {
    modal.classList.add('popup_is-animated');
    setTimeout(() => { modal.classList.add("popup_is-opened");}, 0);
    modal.addEventListener('click', closeTargets);
    document.addEventListener('keydown', closeTargets);
}

//открытие редактирования профиля
profileEditTarget.addEventListener("click", function () {
  openModal(popupTypeEdit);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileName.textContent;
});



//открытие добавления карточек
profileAddCards.addEventListener("click", function () {
  formAddNewCard.reset();
  
  openModal(popupTypeCard);
});
formAddNewCard.addEventListener('submit', submitAddNewCard);

function submitAddNewCard(evt) {
  evt.preventDefault();

  const card = {
      name: inputNewCardName.value,
      link: inputNewCardUrl.value
  }
  cardContainer.prepend(createCard(card, deleteCard, likeCard, openModalImg));
  closeModal(formAddNewCard.closest('.popup'));
}

// Закрытие
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('click', closeTargets);
  document.removeEventListener('keydown', closeTargets);
}
// Закрытие на крестик
popupCloseE.addEventListener("click", function () {
  closeModal(popupTypeEdit);
});
popupCloseI.addEventListener("click", function () {
  closeModal(popupTypeImage);
});
popupCloseA.addEventListener("click", function () {
  closeModal(popupTypeCard);
});

// Закрытие на эскейп
function closeTargets(evt) {
  if (evt.key === 'Escape') {
      closeModal(document.querySelector('.popup_is-opened'));
  }
  if (evt.target === evt.currentTarget) {
      closeModal(document.querySelector('.popup_is-opened'));
  }
}




function editFormSubmit(evt) {
  evt.preventDefault(); 
  profileDescription.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closeModal(popupTypeEdit);
}
formElementEditProfile.addEventListener('submit', editFormSubmit);