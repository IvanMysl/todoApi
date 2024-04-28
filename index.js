const list = document.querySelector(".todo__list");
const fetchTodos = () => {
  return fetch("https://jsonplaceholder.typicode.com/todos").then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      //   console.log(response.json());

      return response.json();
    }
  );
};
const pereborOfMas = (todos) => {
  const marcup = todos
    .map((todo) => {
      return `<li class="item">
    <p id="p">${todo.id}</p>
    <p class="${todo.completed?"completed":""}" id="p">${todo.title}</p>
    <input type="checkbox" checked="${todo.completed}">
    </li>`;
    })
    .join("");
  list.innerHTML = marcup;
};
fetchTodos().then((todos) => pereborOfMas(todos));
