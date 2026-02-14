const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Advanced To-Do App</title>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Segoe UI", sans-serif;
}

body {
  min-height: 100vh;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

body.dark {
  background: linear-gradient(135deg, #141e30, #243b55);
}

.container {
  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.2);
  padding: 25px;
  border-radius: 18px;
  width: 380px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.25);
  text-align: center;
  color: white;
}

h1 {
  margin-bottom: 10px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  margin-bottom: 10px;
  outline: none;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #ffffff;
  font-weight: bold;
}

button:hover {
  opacity: 0.85;
}

ul {
  list-style: none;
  max-height: 220px;
  overflow-y: auto;
}

li {
  background: rgba(255,255,255,0.9);
  color: #333;
  margin: 8px 0;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}

.actions button {
  margin-left: 5px;
}

.counter {
  margin-top: 10px;
  font-size: 14px;
  opacity: 0.9;
}
</style>
</head>

<body>

<div class="container">
  <div class="top-bar">
    <h1>📝 To-Do</h1>
    <button onclick="toggleTheme()">🌙</button>
  </div>

  <input id="search" placeholder="Search tasks..." oninput="renderTasks()"/>
  <input id="taskInput" placeholder="Add a new task..."/>
  <button onclick="addTask()">Add Task</button>

  <ul id="taskList"></ul>
  <div class="counter" id="counter"></div>
</div>

<script>
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  tasks.push({ text: input.value, done: false });
  input.value = "";
  save();
  renderTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  save();
  renderTasks();
}

function toggleDone(i) {
  tasks[i].done = !tasks[i].done;
  save();
  renderTasks();
}

function editTask(i) {
  const newText = prompt("Edit task:", tasks[i].text);
  if (newText) {
    tasks[i].text = newText;
    save();
    renderTasks();
  }
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const search = document.getElementById("search").value.toLowerCase();
  list.innerHTML = "";

  let visible = 0;

  tasks.forEach((t, i) => {
    if (!t.text.toLowerCase().includes(search)) return;

    visible++;

    const li = document.createElement("li");
    if (t.done) li.classList.add("completed");

    li.innerHTML = \`
      <span onclick="toggleDone(\${i})">\${t.text}</span>
      <div class="actions">
        <button onclick="editTask(\${i})">✏️</button>
        <button onclick="deleteTask(\${i})">🗑</button>
      </div>
    \`;

    list.appendChild(li);
  });

  document.getElementById("counter").innerText =
    visible + " task(s) shown • " +
    tasks.filter(t => !t.done).length + " remaining";
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

document.getElementById("taskInput")
  .addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
  });

renderTasks();
</script>

</body>
</html>
  `);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
