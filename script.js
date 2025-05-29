const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

// Ajoute une tâche
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  // Texte de la tâche (cliquable)
  const span = document.createElement("span");
  span.textContent = taskText;

  // Marquage comme faite
  span.addEventListener("click", () => {
    span.classList.toggle("done");
  });

  // Bouton de suppression
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // Construction de l'élément
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);

  input.value = "";
}

button.addEventListener("click", addTask);

// Bonus : appuyer sur "Entrée" ajoute aussi une tâche
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
