//-------------wyświetalnie przepisów -----------
const allRecipesContainer = document.getElementById("allRecipes"); //tbody tablicy

function renderAllRecipes() {
    allRecipesContainer.innerHTML = "";
    const allRecipes = JSON.parse(localStorage.getItem("localRecipes")); //konwersja danych

    allRecipes.forEach(function (el, index) {
        const newRow = document.createElement("tr");

        const newTdId = document.createElement("td"); //dodanie ID
        newTdId.innerText = index + 1;
        newRow.appendChild(newTdId);

        const newTdName = document.createElement("td"); //dodanie NAME
        newTdName.innerHTML = el.name;
        newRow.appendChild(newTdName);

        const newTdDescription = document.createElement("td"); //dodanie DESCRIPTION
        newTdDescription.innerHTML = el.description;
        newRow.appendChild(newTdDescription);

        const newTdIcons = document.createElement("td"); //dodanie ikon
        newRow.appendChild(newTdIcons);
        const newIconEdit = document.createElement("i");
        newIconEdit.classList.add("fas", "fa-edit", "recipe__edit");
        newTdIcons.appendChild(newIconEdit);
        const newIconRemove = document.createElement("i");
        newIconRemove.classList.add("far", "fa-trash-alt", "recipe__remove")
        newTdIcons.appendChild(newIconRemove);

        allRecipesContainer.appendChild(newRow); //dodanie ROW do TBODY
    });
}

renderAllRecipes();

const deleteElement = () => {
    document.querySelectorAll('.recipe__remove').forEach(el => el.addEventListener('click', e => {
        const allRecipes = JSON.parse(localStorage.getItem("localRecipes")); //konwersja danych
        const newRecipes = allRecipes.filter((el, i) => i !== e.target.parentElement.parentElement.firstChild.innerText - 1);
        localStorage.setItem('localRecipes', JSON.stringify(newRecipes));
        renderAllRecipes();
    }));
}

deleteElement();

const editElement = () => {
    document.querySelectorAll('.recipe__edit').forEach(el => el.addEventListener('click', e => {
        const i = e.target.parentElement.parentElement.firstChild.innerText - 1;
        window.location.href = `http://localhost:3000/app.html?recipeId=${i}`;
    }));
}

editElement();

document.querySelector('.recipe__list--title .fa-plus-square').addEventListener('click', () => {
    window.location.href = `http://localhost:3000/app.html?recipeId=new`;
})