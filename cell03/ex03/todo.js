
const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("new-btn");

// Load cookies when open
window.onload = () => {
  const saved = getCookie("todos");
  if (saved) {
    const todos = JSON.parse(saved);
    todos.forEach(text => createTodo(text, false));
  }
};

// Button event create todo
newBtn.addEventListener("click", () => {
  const text = prompt("Enter a new TO DO:");
  if (text && text.trim() !== "") {
    createTodo(text.trim(), true);
  }
});

// create todo item
function createTodo(text, save = true) {
  const todo = document.createElement("div");
  todo.className = "todo";
  todo.textContent = text;

  // Onclick Delete
  todo.addEventListener("click", () => {
    if (confirm("Do you really want to delete this TO DO?")) {
      ftList.removeChild(todo);
      updateCookie();
    }
  });

  // Insert at the top
  ftList.insertBefore(todo, ftList.firstChild);

  // Save cookie
  if (save) updateCookie();
}

// Save current list to cookie
function updateCookie() {
  const todos = [];
  ftList.querySelectorAll(".todo").forEach(todo => {
    todos.push(todo.textContent);
  });
  document.cookie = "todos=" + JSON.stringify(todos) + ";path=/";
}

//get cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
