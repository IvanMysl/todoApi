const list = document.querySelector(".todo__list");
const button = document.querySelector(".add__btn");
const inputAdd = document.querySelector(".input__add");
const apiUrl = "https://664089e9a7500fcf1a9e0886.mockapi.io/todo";

const fetchTodos = () => {
  return fetch(apiUrl).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

const renderData = (todos) => {
  const marcup = todos
    .map((todo) => {
      return `<li class="item" data-id="${todo.id}">
    <div class="inner">
    <p class="id">${todo.id}.</p>
    <input type="checkbox" class="input__true-false" ${
      todo.completed ? "checked" : ""
    }>
    <p class="${todo.completed ? "completed" : ""} text">${todo.title}</p>
    </div>
    <button class="button__delete">Видалити завдання</button>
    </li>`;
    })
    .join("");
  list.innerHTML = marcup;
};

const getData = () => {
  fetchTodos().then((todos) => renderData(todos));
};
const addTodo = (title) => {
  const newTask = {
    title: title ,
    completed: false,
  };
  return fetch(apiUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newTask),
  }).then((response) => response.json());
};
const deleteTodo = (id) => {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
};
const updateTodo = (id, completed) => {
  return fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ completed }),
  }).then((response) => response.json());
};
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("button__delete")) {
    const id = e.target.closest(".item").dataset.id;
    deleteTodo(id).then(() => getData());
  }
  if (e.target.classList.contains("input__true-false")) {
    const id = e.target.closest(".item").dataset.id;
    const completed = e.target.checked;
    updateTodo(id, completed).then(() => getData());
  }
});
button.addEventListener("click", () => {
  const title = inputAdd.value.trim();
  if (title) {
    addTodo(title).then(() => {
      inputAdd.value = "";
      getData();
    });
  }
});

getData();
