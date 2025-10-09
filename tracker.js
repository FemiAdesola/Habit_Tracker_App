// Habit Tracker with Persistent Theme Toggle

const newHabit = document.getElementById("newHabit");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const habitList = document.getElementById("habitList");
const totalEl = document.getElementById("total");

const KEY = "habit-tracker:v2";
const THEME_KEY = "habit-tracker:theme";

// initial state of hibit
let state = { habits: [] };
let selectedIndex = 0;

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function load() {
  try {
    state = JSON.parse(localStorage.getItem(KEY)) || { habits: [] };
  } catch {
    state = { habits: [] };
  }
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}
function escapeHtml(s) {
  return s.replace(
    /[&<>]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])
  );
}

// Habit functions CRUD
function addHabit(name) {
  name = name.trim();
  if (!name) return;
  state.habits.push({ id: uid(), name, ticks: [] });
  save();
  render();
}

// fucntion to remove habit 
function removeHabit(id) {
  state.habits = state.habits.filter((h) => h.id !== id);
  if (selectedIndex >= state.habits.length)
    selectedIndex = Math.max(0, state.habits.length - 1);
  save();
  render();
}
//

// Rendering habit
function render() {
  habitList.innerHTML = "";

  state.habits.forEach((h, idx) => {
    const row = document.createElement("div");
    row.className = "habit";
    if (idx === selectedIndex) row.classList.add("selected");
    row.tabIndex = 0;

    const left = document.createElement("div");
    left.className = "h-left";
    left.innerHTML = `
        <div class="dot" style="background:${h.color}"></div>
        <div class="title">${escapeHtml(h.name)}</div>
        
    `;
    // For rendering delet the habit
    const del = document.createElement("button");
    del.className = "ghost small";
    del.textContent = "🗑";
    del.onclick = () => {
      if (confirm(`Delete "${h.name}"?`)) removeHabit(h.id);
    };

    // For appending the habit
    row.append(left, del);
    row.onclick = () => {
      selectedIndex = idx;
      render();
    };

    habitList.appendChild(row);
  });

  totalEl.textContent = state.habits.length;
  save();
}

// Events
addBtn.onclick = () => {
  addHabit(newHabit.value);
  newHabit.value = "";
  newHabit.focus();
};

// Init
load();
render();
