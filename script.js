const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = [];

// Charger les tâches du localStorage au démarrage
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

// Sauvegarder dans localStorage
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Afficher les tâches à l’écran
function renderTasks(filter = "all") {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (filter === "active" && task.done) ||
      (filter === "done" && !task.done)
    ) {
      return; // Skip
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("done");

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

// Filtrage
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    renderTasks(filter);
  });
});

// Écouteurs
button.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
