const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do List</title>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Segoe UI", sans-serif;
    }

    body {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      background: white;
      padding: 25px;
      border-radius: 15px;
      width: 360px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      text-align: center;
    }

    h1 {
      margin-bottom: 15px;
      color: #333;
    }

    .input-section {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
    }

    input {
      flex: 1;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #ccc;
      outline: none;
    }

    button {
      padding: 10px 15px;
      border: none;
      background: #667eea;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s;
    }

    button:hover {
      background: #5563d6;
    }

    ul {
      list-style: none;
    }

    li {
      background: #f4f4f4;
      margin: 8px 0;
      padding: 10px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }

    li.completed {
      text-decoration: line-through;
      opacity: 0.6;
    }

    .delete-btn {
      background: red;
      border: none;
      color: white;
      padding: 5px 8px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>📝 My To-Do List</h1>

    <div class="input-section">
      <input type="text" id="taskInput" placeholder="Enter a task..." />
      <button onclick="addTask()">Add</button>
    </div>

    <ul id="taskList"></ul>
  </div>

  <script>
    function addTask() {
      const input = document.getElementById("taskInput");
      const taskText = input.value.trim();

      if (taskText === "") return;

      const li = document.createElement("li");
      li.textContent = taskText;

      li.onclick = () => {
        li.classList.toggle("completed");
      };

      const delBtn = document.createElement("button");
      delBtn.textContent = "X";
      delBtn.className = "delete-btn";

      delBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
      };

      li.appendChild(delBtn);
      document.getElementById("taskList").appendChild(li);

      input.value = "";
    }

    document.addEventListener("keypress", function(e) {
      if (e.key === "Enter") addTask();
    });
  </script>
</body>
</html>
  `);
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
