$(document).ready(function() {
    const $ftList = $("#ft_list");
    const $newBtn = $("#new-btn");
  
    // Load cookies when open
    const saved = getCookie("todos");
    if (saved) {
      const todos = JSON.parse(saved);
      todos.forEach(text => createTodo(text, false));
    }
  
    // Button event create todo
    $newBtn.on("click", function() {
      const text = prompt("Enter a new TO DO:");
      if (text && text.trim() !== "") {
        createTodo(text.trim(), true);
      }
    });
  
    // Create todo item
    function createTodo(text, save = true) {
      const $todo = $("<div>").addClass("todo").text(text);
  
      // Onclick Delete
      $todo.on("click", function() {
        if (confirm("Do you really want to delete this TO DO?")) {
          $todo.remove();
          updateCookie();
        }
      });
  
      // Insert at the top
      $ftList.prepend($todo);
  
      // Save cookie
      if (save) updateCookie();
    }
  
    // Save current list to cookie
    function updateCookie() {
      const todos = [];
      $(".todo").each(function() {
        todos.push($(this).text());
      });
      document.cookie = "todos=" + JSON.stringify(todos) + ";path=/";
    }
  
    // Get cookies
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
  });
  