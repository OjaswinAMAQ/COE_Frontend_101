// ===============================
// GLOBAL VARIABLES
// ===============================
let tasks = []; // Array to store task objects
let currentFilter = "all"; // all | completed | pending
let searchQuery = "";
let currentSort = "newest";

// ===============================
// DOM ELEMENTS
// ===============================
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");
const totalTasksEl = document.getElementById("totalTasks");
const completedTasksEl = document.getElementById("completedTasks");
const pendingTasksEl = document.getElementById("pendingTasks");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

// ===============================
// FUNCTIONS
// ===============================

// Add a new task
function addTask(title) {
  if (!title.trim()) {
    alert("Task cannot be empty!");
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks(currentFilter);
  updateStats();
}

// Delete task
function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks(currentFilter);
    updateStats();
  }
}

// Toggle completion
function toggleComplete(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks(currentFilter);
    updateStats();
  }
}

// Render tasks (FILTER → SEARCH → SORT → RENDER)
function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let visibleTasks = [...tasks];

  if (filter === "completed") {
    visibleTasks = visibleTasks.filter((t) => t.completed);
  } else if (filter === "pending") {
    visibleTasks = visibleTasks.filter((t) => !t.completed);
  }

  if (searchQuery) {
    visibleTasks = visibleTasks.filter((t) =>
      t.title.toLowerCase().includes(searchQuery)
    );
  }

  switch (currentSort) {
    case "oldest":
      visibleTasks.sort((a, b) => a.id - b.id);
      break;
    // case "completed":
    //   visibleTasks.sort((a, b) => b.completed - a.completed);
    //   break;
    // case "pending":
    //   visibleTasks.sort((a, b) => a.completed - b.completed);
    //   break;
    default: // newest
      visibleTasks.sort((a, b) => b.id - a.id);
  }

  if (visibleTasks.length === 0) {
    emptyState.style.display = "block";

    if (currentFilter === "completed") {
      emptyState.innerHTML = "No tasks completed yet";
    } else {
      emptyState.innerHTML = "You're all caught up!";
    }
  } else {
    emptyState.style.display = "none";
  }

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <input
        type="checkbox"
        class="complete-checkbox"
        data-id="${task.id}"
        ${task.completed ? "checked" : ""}
      />
      <span class="task-title">${task.title}</span>
      <button class="delete-btn" data-id="${task.id}">
        Delete
      </button>
    `;

    taskList.appendChild(li);
  });
}

// Update analytics
function updateStats() {
  totalTasksEl.textContent = tasks.length;
  completedTasksEl.textContent = tasks.filter((t) => t.completed).length;
  pendingTasksEl.textContent = tasks.filter((t) => !t.completed).length;
}

// ===============================
// EVENT LISTENERS
// ===============================

// Add task
addTaskBtn.addEventListener("click", () => addTask(taskInput.value));
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask(taskInput.value);
});

// Delete / toggle complete (event delegation)
taskList.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("delete-btn")) {
    deleteTask(id);
  }

  if (e.target.classList.contains("complete-checkbox")) {
    toggleComplete(id);
  }
});

// Filters
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks(currentFilter);
  });
});

// Search
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderTasks(currentFilter);
});

// Sort
sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  renderTasks(currentFilter);
});

// ===============================
// INITIAL LOAD
// ===============================
renderTasks();
updateStats();
