const resturantInput = document.getElementById("resturant-input");
const mealInput = document.getElementById("meal-input");
const commentInput = document.getElementById("comment-input");
const savedContainer = document.getElementById("saved-container");
const form = document.querySelector("form");
 
// recieve the user input

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const restaurantValue = resturantInput.value;
  const mealValue = mealInput.value;
  const commentValue = commentInput.value;

  const card = createCard(restaurantValue, mealValue, commentValue);
  appendToContainer(card);

  saveData(restaurantValue, mealValue, commentValue);

  resturantInput.value = "";
  mealInput.value = "";
  commentInput.value = "";
}

function createCard(restaurant, meal, comment) {
  const card = document.createElement("div");
  card.classList.add("card");

 
  const elements = [
    createParagraph(`Restaurant: ${restaurant}`),
    createParagraph(`Meal: ${meal}`),
    createParagraph(`Notes: ${comment}`),
    createDeleteButton(restaurant, meal, comment),
  ];

  elements.forEach((element) => card.appendChild(element));

  return card;
}


// Create the user input with bold headlines
function createParagraph(text) {
  const paragraph = document.createElement('p');
  const strong = document.createElement('strong');
  strong.textContent = text.substring(0, text.indexOf(':') + 1); // Extract consistent text
  const rest = document.createTextNode(text.substring(text.indexOf(':') + 1)); // Extract user input
  paragraph.appendChild(strong);
  paragraph.appendChild(rest);
  return paragraph;
}

// create delete button and ability to delete
function createDeleteButton(restaurant, meal, comment) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    const card = deleteBtn.parentElement;
    card.remove();
    removeItem(restaurant, meal, comment);
  });

  return deleteBtn;
}

function appendToContainer(element) {
  savedContainer.appendChild(element);
}

// save data to local storage

function saveData(restaurant, meal, comment) {
  let savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  savedData.push({
    restaurantValue: restaurant,
    mealValue: meal,
    commentValue: comment,
  });
  localStorage.setItem("savedData", JSON.stringify(savedData));
}

function removeItem(restaurant, meal, comment) {
  let savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  savedData = savedData.filter(
    (item) =>
      item.restaurantValue !== restaurant ||
      item.mealValue !== meal ||
      item.commentValue !== comment
  );
  localStorage.setItem("savedData", JSON.stringify(savedData));
}

// get local storage data on load 
window.onload = function () {
  let savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  savedData.forEach((item) => {
    const card = createCard(
      item.restaurantValue,
      item.mealValue,
      item.commentValue
      );
      appendToContainer(card);
    });
  };