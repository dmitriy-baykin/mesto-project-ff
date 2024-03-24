// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardBox = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardContent, cardDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", function () {
    cardDelete(cardElement);
  });
  return cardElement;
}
// @todo: Функция удаления карточки
function cardDelete(cardElement) {
  return cardElement.remove();
}
// @todo: Вывести карточки на страницу
function addCards() {
  initialCards.forEach((cardContent) =>
    cardBox.append(createCard(cardContent, cardDelete))
  );
}
addCards();
