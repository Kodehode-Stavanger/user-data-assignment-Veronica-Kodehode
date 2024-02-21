const resturantInput = document.getElementById("resturant-input");
const mealInput = document.getElementById("meal-input");
const commentInput = document.getElementById("comment-input");
const savedContainer = document.getElementById("saved-container");
const form = document.querySelector("form");

function createCard(resturant, meal, comment) {
  const card = document.createElement("div");
  card.textContent = `Restaurant: ${resturant} Meal: ${meal} Notes: ${comment}`;
  card.classList.add("card");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    card.remove();
    removeItem(resturant, meal, comment);
  });

  card.appendChild(deleteBtn);

  return card;
}

window.onload = function () {
  let savedData = JSON.parse(localStorage.getItem("savedData"));
  if (savedData) {
    savedData.forEach((item) => {
      const card = createCard(
        item.resturantValue,
        item.mealValue,
        item.commentValue
      );
      savedContainer.appendChild(card);
    });
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const resturantValue = resturantInput.value;
  const mealValue = mealInput.value;
  const commentValue = commentInput.value;

  const card = document.createElement("div");
  card.textContent = `Resturant: ${resturantValue} Meal: ${mealValue} Notes: ${commentValue}`;
  card.classList.add("card");

  savedContainer.appendChild(card);

  saveData(resturantValue, mealValue, commentValue);

  resturantInput.value = "";
  mealInput.value = "";
  commentInput.value = "";
});

function saveData(resturant, meal, comment) {
  let savedData = localStorage.getItem("savedData");
  if (!savedData) {
    savedData = [];
  } else {
    savedData = JSON.parse(savedData);
  }
  savedData.push({
    resturantValue: resturant,
    mealValue: meal,
    commentValue: comment,
  });
  localStorage.setItem("savedData", JSON.stringify(savedData));
  console.log(savedData);
}

function removeItem(resturant, meal, comment) {
  let savedData = JSON.parse(localStorage.getItem("savedData"));
  if (!savedData) {
    return;
  }
  savedData = savedData.filter(
    (item) =>
      item.resturantValue !== resturant ||
      item.mealValue !== meal ||
      item.commentValue !== comment
  );
  localStorage.setItem("savedData", JSON.stringify(savedData));
}
