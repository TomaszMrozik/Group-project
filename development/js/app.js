const widgetMessagesList = ["info", "exclamation", "success"]; //list of closing elements

class ItemToHide {
    constructor(id) {
        this.clickTarget = document.getElementById(id);
    }

    showMe(text) { // shows hidden message + adds custom text to it
        this.clickTarget.parentElement.classList.remove('hidden');
        this.clickTarget.parentElement.querySelector('.app__widget--message--text').innerHTML = text;

    }

    addListener() { //after click parent of element is hidden
        this.clickTarget.addEventListener('click', (e) => e.target.parentElement.classList.add('hidden'));
    }
}

//construct elements to hide, then add listener
const widgetMessages = widgetMessagesList.map(el => new ItemToHide(el));
widgetMessages.forEach(el => el.addListener());

//Tworzenie przepisu
const form = {
    form: document.getElementById('recipe-form'),
    cancel: document.getElementById('cancel-recipe'),
    save: document.getElementById('save-recipe'),
    name: document.getElementById('recipe-name'),
    description: document.getElementById('recipe-description'),
    instruction: document.getElementById('recipe-instruction'),
    addInstruction: document.getElementById('recipe-instruction-add'),
    instructionsList: document.getElementById('instructions-list'),
    ingredient: document.getElementById('recipe-ingredients'),
    addIngredient: document.getElementById('recipe-ingredients-add'),
    ingredientsList: document.getElementById('ingredients-list'),
}
//Dodanie składnika lub instrukcji
let editedElem = null;
const addToListFinish = (edit, remove, input, placeholder) => {
    editListElement(edit, input);
    deleteListElement(remove);
    document.getElementById(input).value = '';
    document.getElementById(input).setAttribute('placeholder', placeholder);
    editedElem = null;
}

const addToList = (e) => {
    if (e.target === form.addInstruction) {
        if (form.instruction.value.length > 50 || form.instruction.value.length < 5) {
            showWarning('recipe-instruction-warning');
        } else if (editedElem) {
            editedElem.innerHTML = form.instruction.value + ' <i class="edit-list-item fas fa-edit"></i> <i class="remove-list-item fas fa-trash-alt"></i>';
            addToListFinish('#instructions-list .edit-list-item', '#instructions-list .remove-list-item', 'recipe-instruction', 'Jaki jest następny krok?');
        } else {
            const listElement = document.createElement('li');
            listElement.innerHTML = form.instruction.value + ' <i class="edit-list-item fas fa-edit"></i> <i class="remove-list-item fas fa-trash-alt"></i>';
            form.instructionsList.appendChild(listElement);
            addToListFinish('#instructions-list .edit-list-item', '#instructions-list .remove-list-item', 'recipe-instruction', 'Jaki jest następny krok?');
        }
    } else if (e.target === form.addIngredient) {
        if (form.ingredient.value.length > 150 || form.ingredient.value.length < 5) {
            showWarning('recipe-ingredient-warning');
        } else if (editedElem) {
            editedElem.innerHTML = form.ingredient.value + ' <i class="edit-list-item fas fa-edit"></i> <i class="remove-list-item fas fa-trash-alt"></i>';
            addToListFinish('#ingredients-list .edit-list-item', '#ingredients-list .remove-list-item', 'recipe-ingredients', 'Jaki jest następny składnik?');
        } else {
            const listElement = document.createElement('li');
            listElement.innerHTML = form.ingredient.value + ' <i class="edit-list-item fas fa-edit"></i> <i class="remove-list-item fas fa-trash-alt"></i>';
            form.ingredientsList.appendChild(listElement);
            addToListFinish('#ingredients-list .edit-list-item', '#ingredients-list .remove-list-item', 'recipe-ingredients', 'Jaki jest następny składnik?');
        }
    } else {
        console.log('something went wrong');
    }
}
//Usuwanie ostrzeżeń dotyczących długości danych wprowadzonych w formularzu
document.querySelectorAll('.warning').forEach(el => el.addEventListener('click', e => e.target.classList.add('hidden')));
//Ukrywanie formularza
const hideForm = (form) => form.classList.add('hidden');
//Dodawanie elementów do list
form.addInstruction.addEventListener('click', addToList);
form.addIngredient.addEventListener('click', addToList);
//Anulowanie wypełniania formularza
form.cancel.addEventListener('click', () => {
    form.form.reset;
    hideForm(form.form);
});
//Zapisanie przepisu
const showWarning = (id) => {
    document.getElementById(id).classList.remove('hidden');
}
const save = (e) => {
    e.preventDefault();
    if (form.name.value.length > 50 || form.name.value.length < 2) {
        showWarning('recipe-name-warning');
    }
    if (form.description.value.length > 360 || form.description.value.length < 10) {
        showWarning('recipe-description-warning');
    } else {
        let recipes = JSON.parse(localStorage.getItem('localRecipes'));
        if (!recipes) {
            recipes = [];
        }
        const instructions = document.querySelectorAll('#instructions-list li');
        const inst = [];
        instructions.forEach(el => inst.push(el.innerText.slice(0, -2)));
        const ingredients = document.querySelectorAll('#ingredients-list li');
        const ingr = [];
        ingredients.forEach(el => ingr.push(el.innerText.slice(0, -2)));
        const recipe = {
            name: form.name.value,
            description: form.description.value,
            instructions: inst,
            ingredients: ingr
        }
        if (gup('recipeId')) {
            recipes[gup('recipeId')] = recipe;
        } else {
            recipes.push(recipe);
        }
        localStorage.setItem('localRecipes', JSON.stringify(recipes));
        window.location.href = `http://localhost:3000/app.html`;
        console.log(JSON.parse(localStorage.getItem('localRecipes')));
        hideForm(form.form);
        counterUpdate();
    }
}
//Uaktualnienie licznika przepisów
const counterUpdate = () => {
    const l = JSON.parse(localStorage.getItem('localRecipes'));
    if (l) {
        document.querySelector('.app__widget--message--text').innerText = `Nieźle Ci idzie tworzenie przepisów, masz ich już ${l.length}!`;
    } else {
        document.querySelector('.app__widget--message--text').innerText = 'Dodaj jakiś przepis!';
    }
}
form.save.addEventListener('click', save);

window.addEventListener('DOMContentLoaded', () => counterUpdate());

document.getElementById('widget-add-recipe').addEventListener('click', () => form.form.classList.remove('hidden'));
document.getElementById('widget-add-plan').addEventListener('click', () => planForm.form.classList.remove('hidden'));


//Dodanie imienia dla odwiedzającego po raz pierwszy
const firstTime = localStorage.getItem("userName");
const nameForm = document.querySelector(".app__form");
const getName = document.querySelector(".userName")
const formBtn = document.querySelector(".form__button");

if (!firstTime) {
    formBtn.addEventListener('click', function () {
        const userName = getName.value;
        localStorage.setItem('userName', `${userName}`);
        document.getElementById('user__name').innerHTML = `${localStorage.getItem("userName")}`;
    })

} else {
    nameForm.classList.add("hidden");
    document.getElementById("user__name").innerHTML = `${localStorage.getItem("userName")}`;
}

//Usuwanie elementów listy
const deleteListElement = (selector) => {
    document.querySelectorAll(selector).forEach(el => el.addEventListener('click', e => e.target.parentElement.remove()));
}


//Edytowanie elementów listy
const editListElement = (selector, input) => {
    document.querySelectorAll(selector).forEach((element) => {
        element.addEventListener("click", (e) => {
            editedElem = e.target.parentElement;
            document.getElementById(input).value =
                e.target.parentElement.innerText.slice(0, -2);
        });
    });
}


//Tworzenie nowego planu
const planForm = {
    form: document.getElementById('plan-form'),
    cancel: document.getElementById('cancel-plan'),
    save: document.getElementById('save-plan'),
    name: document.getElementById('plan-name'),
    description: document.getElementById('plan-description'),
    week: document.getElementById('week-number'),
    mondayInputs: document.querySelectorAll('.mon select'),
    tuesdayInputs: document.querySelectorAll('.tues select'),
    wednesdayInputs: document.querySelectorAll('.wed select'),
    thursdayInputs: document.querySelectorAll('.thur select'),
    fridayInputs: document.querySelectorAll('.fri select'),
    saturdayInputs: document.querySelectorAll('.sat select'),
    sundayInputs: document.querySelectorAll('.sun select'),
}

//Dodawanie przepisów do opcji wybory planu

const addOptions = () => {
    const recipes = JSON.parse(localStorage.getItem('localRecipes'));
    const selects = document.querySelectorAll('select');
    if (!recipes) {
        console.warn('Trzeba dodać jakiś przepis');
    } else {
        recipes.forEach(recipe => {
            const option = document.createElement('option');
            option.setAttribute('value', JSON.stringify(recipe));
            option.innerText = recipe.name;
            selects.forEach(select => {
                select.appendChild(option);
            });
        });
    }
}

addOptions();

//Zapis planu
const savePlan = (e) => {
    e.preventDefault();
    if (planForm.name.value.length > 50 || planForm.name.value.length < 2) {
        // showWarning('recipe-name-warning');
        console.warn('Wymagana długość nazwy między 3 a 50 znaków');
    } else if (planForm.description.value.length > 360 || planForm.description.value.length < 10) {
        // showWarning('recipe-description-warning');
        console.warn('Wymagana długość opisu między 10 a 360 znaków');
    } else if (planForm.week < 1 || planForm.week > 52) {
        console.warn('Wymagana wartość tygodnia między 1 a 52');
    } else {
        let plans = JSON.parse(localStorage.getItem('localPlans'));
        if (!plans) {
            plans = [];
        }
        const monday = [];
        planForm.mondayInputs.forEach(el => monday.push(el.value));
        const tuesday = [];
        planForm.tuesdayInputs.forEach(el => tuesday.push(el.value));
        const wednesday = [];
        planForm.wednesdayInputs.forEach(el => wednesday.push(el.value));
        const thursday = [];
        planForm.thursdayInputs.forEach(el => thursday.push(el.value));
        const friday = [];
        planForm.thursdayInputs.forEach(el => friday.push(el.value));
        const saturday = [];
        planForm.saturdayInputs.forEach(el => saturday.push(el.value));
        const sunday = [];
        planForm.sundayInputs.forEach(el => sunday.push(el.value));
        const plan = {
            name: planForm.name.value,
            description: planForm.description.value,
            week: parseInt(planForm.week.value),
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday
        }
        plans.push(plan);
        localStorage.setItem('localPlans', JSON.stringify(plans));
        console.log(JSON.parse(localStorage.getItem('localPlans')));
        hideForm(planForm.form);
    }
}

//Anulowanie tworzenia nowego planu
planForm.cancel.addEventListener('click', () => hideForm(planForm.form));
planForm.save.addEventListener('click', savePlan);

//Wyświetla numer aktualnego tygodnia
const weekNumber = document.getElementById("weekNumber");
const next = document.querySelector(".button__next");
const previous = document.querySelector(".button__previous");

next.style.cursor = 'pointer';
previous.style.cursor = 'pointer';

Date.prototype.getWeekNumber = function () {
    let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    let dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
};

weekNumber.innerHTML = `${new Date().getWeekNumber()}`;


function gup(name, url) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1];
}

if (gup('recipeId')) {
    if (gup('recipeId') === 'new') {
        form.form.classList.remove('hidden');
    } else {
        form.form.classList.remove('hidden');
        const allRecipes = JSON.parse(localStorage.getItem("localRecipes")); //konwersja danych
        form.name.value = allRecipes[gup('recipeId')].name;
        form.description.value = allRecipes[gup('recipeId')].description;
        allRecipes[gup('recipeId')].instructions.forEach(el => {
            const listElement = document.createElement('li');
            listElement.innerHTML = el + ' <i class="edit-list-item fas fa-edit"></i> <i class="remove-list-item fas fa-trash-alt"></i>';
            form.instructionsList.appendChild(listElement);
            addToListFinish('#instructions-list .edit-list-item', '#instructions-list .remove-list-item', 'recipe-instruction', 'Jaki jest następny krok?');
        });
        allRecipes[gup('recipeId')].ingredients.forEach(el => {
            const listElement = document.createElement('li');
            listElement.innerHTML = el + ' <i class="edit-list-item fas fa-edit"></i> <i class="remove-list-item fas fa-trash-alt"></i>';
            form.ingredientsList.appendChild(listElement);
            addToListFinish('#ingredients-list .edit-list-item', '#ingredients-list .remove-list-item', 'recipe-ingredients', 'Jaki jest następny składnik?');
        });
    }
}

//next i previous zmieniają numer tygodnia

next.addEventListener('click', function () {
    if (parseInt(weekNumber.innerHTML) < 52) {
        weekNumber.innerHTML = `${parseInt(weekNumber.innerHTML) + 1}`;
    }
});

previous.addEventListener('click', function () {
    if (parseInt(weekNumber.innerHTML) > 0) {
        weekNumber.innerHTML = `${parseInt(weekNumber.innerHTML) - 1}`;
    } else {

    }
});

//Wyświetlanie planu do tygodnia

const monday = document.querySelectorAll('.app__calendar_table tbody tr :nth-child(1)');
const thuseday = document.querySelectorAll('.app__calendar_table tbody tr :nth-child(2)');
const wednesday = document.querySelectorAll('.app__calendar_table tbody tr :nth-child(3)');
const thursday = document.querySelectorAll('.app__calendar_table tbody tr :nth-child(4)');
const friday = document.querySelectorAll('.app__calendar_table tbody tr :nth-child(5)');
const saturday = document.querySelectorAll('.app__calendar_table tbody tr :nth-child(6)');
const sunday = document.querySelectorAll('.app__calendar_table tbody tr :nth-child(7)');

if (planForm.week == weekNumber.innerHTML) {
    planForm.mondayInputs.forEach(function () {

    });
}
