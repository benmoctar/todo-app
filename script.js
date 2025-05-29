const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = [];

// Charger les tâches depuis localStorage au démarrage
window.onload = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
};

// Ajouter une tâche
function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ text, done: false });
  input.value = "";
  saveAndRender();
}

// Sauvegarder et réafficher
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Afficher les tâches avec filtre
function renderTasks(filter = "all") {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (filter === "active" && task.done) ||
      (filter === "done" && !task.done)
    ) {
      return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    if (task.done) {
      span.classList.add("done");
      span.innerHTML = `✅ ${task.text}`;
    } else {
      span.innerHTML = task.text;
    }

    span.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveAndRender();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Filtres
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    renderTasks(filter);
  });
});

// Événements
button.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
