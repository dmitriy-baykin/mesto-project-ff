// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardBox = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardContent, cardDelete) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__title").textContent = cardContent.name;
  cardElement.querySelector(".card__image").src = cardContent.link;
  cardDeleteButton.addEventListener("click", function () {
    cardDelete();
  });
  return cardElement;
}
// @todo: Функция удаления карточки
function cardDelete() {
  const cardElement = document.querySelector(".places__item");
  cardElement.remove();
}
// @todo: Вывести карточки на страницу
function addCards() {
  initialCards.forEach((cardContent) =>
    cardBox.append(createCard(cardContent, cardDelete))
  );
}
addCards();
