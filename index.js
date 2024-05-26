const list = document.querySelector(".todo__list");
const button = document.querySelector(".add__btn");
const inputAdd = document.querySelector(".input__add");
const fetchTodos = () => {
  return fetch("https://664089e9a7500fcf1a9e0886.mockapi.io/todo").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      //   console.log(response.json());

      return response.json();
    }
  );
};
const renderData = (todos) => {
  // console.log(todos);
  const marcup = todos
    .map((todo) => {
      return `<li class="item">
    <div class="inner"><p id="p">${todo.id}.</p>
    <input type="checkbox" onclick="saveChecked(${todo.id},${todo.completed})" class="input__true-false" ${todo.completed ? "checked" : ""}>
    <p class="${todo.completed ? "completed" : ""} text" id="p">${
        todo.title
      }</p>
    </div>
    <button class="button__delete" onclick="deleteTask(${
      todo.id
    })">Видалити завдання</button>
    </li>`;
    })
    .join("");
  list.innerHTML = marcup;
};
function getData() {
  fetchTodos().then((todos) => renderData(todos));
}
button.addEventListener("click", () => {
  console.log(document.querySelectorAll(".input__true-false"));
  const inputText = inputAdd.value;
  if (inputText.trim() === "") {
    inputAdd.style.borderColor = "red";
  } else {
    inputAdd.style.borderColor = "black";
    inputAdd.value = "";

    const newTask = {
      title: `${inputText}`,
      completed: false,
    };
    fetch("https://664089e9a7500fcf1a9e0886.mockapi.io/todo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        response.json();
        getData();
      })
      .then((json) => console.log(json));
  }
});
function deleteTask(id) {
  fetch(`https://664089e9a7500fcf1a9e0886.mockapi.io/todo/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        getData();
        return response.json();
      }
    })
    .then((task) => {})
    .catch((error) => {
      // handle error
    });
}
function saveChecked(id, todo) {
  fetch(`https://664089e9a7500fcf1a9e0886.mockapi.io/todo/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ completed: `${todo.completed ? "true" : "false"}` }),
  })
    .then((response) => {
      if (response.ok) {
        getData();
        return response.json();
      }
    })
    .then((task) => {})
    .catch((error) => {
      // handle error
    });
}

getData();
