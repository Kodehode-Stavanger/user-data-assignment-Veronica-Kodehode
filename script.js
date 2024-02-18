const resturantInput = document.getElementById("resturant-input");
const mealInput = document.getElementById("meal-input");
const notesInput = document.getElementById("notes-input");
const savedContainer = document.getElementById("saved-container");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const resturantValue = resturantInput.value;
    const mealValue = mealInput.value;
    const notesValue = notesInput.value;


const card = document.createElement("div")
card.textContent = `Resturant: ${resturantValue} Meal: ${mealValue} Notes: ${notesValue}`
card.classList.add("card")

savedContainer.appendChild(card)

resturantInput.value = "";
mealInput.value = "";
notesInput.value = "";

})


