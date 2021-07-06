//-------------wyświetalnie planów -----------
const allPlansContainer = document.getElementById("allPlans"); //tbody tablicy

function renderAllPlans() {
    allPlansContainer.innerHTML = "";
    const allPlans = JSON.parse(localStorage.getItem("localPlans")); //konwersja danych

    allPlans.forEach(function (el, index) {
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

        const newTdWeek = document.createElement("td"); //dodanie tygodnia
        newTdWeek.innerHTML = el.week;
        newRow.appendChild(newTdWeek);

        const newTdIcons = document.createElement("td"); //dodanie ikon
        newRow.appendChild(newTdIcons);
        const newIconEdit = document.createElement("i");
        newIconEdit.classList.add("fas", "fa-edit", "plan__edit");
        newTdIcons.appendChild(newIconEdit);
        const newIconRemove = document.createElement("i");
        newIconRemove.classList.add("far", "fa-trash-alt", "plan__remove")
        newTdIcons.appendChild(newIconRemove);

        allPlansContainer.appendChild(newRow); //dodanie ROW do TBODY
    });
}

renderAllPlans();