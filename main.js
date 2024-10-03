const formButton = document.querySelector(".form__button");
const formInput = document.querySelector(".form__input");
const todoAllList = document.querySelector(".todo-all-list");
const todoDoneList = document.querySelector(".todo-done-list");
const todoNowList = document.querySelector(".todo-now-list");
const allTasks = document.querySelector(".all-t");
const doneTasks = document.querySelector(".done-t");
const nowTasks = document.querySelector(".now-t");
const todoAll = document.querySelector(".todo-all");
const todoDone = document.querySelector(".todo-done");
const todoNow = document.querySelector(".todo-now");
const deleteAll = document.querySelector(".delete-all");
const deleteDone = document.querySelector(".delete-done");


// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

// Функция для записи в локальное хранилище
function toLocal() {
    let todo = todoAllList.innerHTML;
    window.localStorage.setItem("todo", todo);
}

// Функция добавления задачи
function addTask(input) {
    if (input.value) {
        let li = document.createElement("li");
        li.innerHTML = `${formInput.value}<span></span>`;
        li.classList.add("todo-all-list-item");
        input.value = "";
        todoAllList.append(li);
    } else {
        alert("Введите задачу");
    }
}

// Функция отметки и удаления
function CheckOrDelete(e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("check");
        toLocal();
    } else if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove();
        toLocal();
    }
}

// Функция переключения вкладок - list _active - на кого переключаем
function toggleDisplay(list_active, list_2, list_3) {
    list_active.style.display = "block";
    list_2.style.display = "none";
    list_3.style.display = "none";
}

// Функция переключения активного стиля
function toggleActiveStyle(list_active, list_2, list_3) {
    list_active.classList.add("active-task");
    list_2.classList.remove("active-task");
    list_3.classList.remove("active-task");
}

// ОСНОВНАЯ ПРОГРАММА

// Проверка есть ли в локальном хранилище сохраненные задачи
if (window.localStorage.getItem("todo")) {
    todoAllList.innerHTML = window.localStorage.getItem("todo");
}

// Добавление задачи при нажатии на кнопку
formButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (todoDone.style.display == "block" || todoNow.style.display == "block") {
        toggleDisplay(todoAll, todoDone, todoNow);
        toggleActiveStyle(allTasks, nowTasks, doneTasks);
        todoAllList.innerHTML = window.localStorage.getItem("todo");
    }

    addTask(formInput);
    toLocal();
});

// Отметка о выполнении задания - класс check + удаление задачи
todoAllList.addEventListener("click", (e) => {
    CheckOrDelete(e);
});

// Удаление всех задач 
deleteAll.addEventListener('click', (e) => {
    e.preventDefault();
    todoAllList.innerHTML = "";
    todoDoneList.innerHTML = "";
    todoNowList.innerHTML = "";

    toLocal();
});

// Удаление всех выполненных задач
deleteDone.addEventListener('click', (e) => {
    e.preventDefault();
    let done = document.querySelectorAll(".check");
    for (let d of done) {
        d.remove();
    }
    todoDoneList.innerHTML = "";
    toLocal();
});

// Переключение на вкладку выполненные задачи
doneTasks.addEventListener('click', (e) => {

    toggleDisplay(todoDone, todoAll, todoNow);
    toggleActiveStyle(doneTasks, allTasks, nowTasks);
    todoDoneList.innerHTML = "";

    let list = document.querySelectorAll(".todo-all-list li.check");
    for (let l of list) {
        todoDoneList.append(l.cloneNode(true));
    }
    todoDone.append(todoDoneList);
});

// Переключение на вкладку все задачи
allTasks.addEventListener('click', (e) => {

    todoDone.innerHTML = "";
    todoNow.innerHTML = "";
    toggleDisplay(todoAll, todoDone, todoNow);
    toggleActiveStyle(allTasks, nowTasks, doneTasks);

    todoAllList.innerHTML = window.localStorage.getItem("todo");
});

// Переключение на вкладку не выполненные задачи
nowTasks.addEventListener('click', (e) => {

    toggleDisplay(todoNow, todoAll, todoDone);
    toggleActiveStyle(nowTasks, allTasks, doneTasks);
    todoNowList.innerHTML = "";

    let list = document.querySelectorAll(".todo-all-list li:not(.check)");
    for (let l of list) {
        todoNowList.append(l.cloneNode(true));

    }
    todoNow.append(todoNowList);
});

