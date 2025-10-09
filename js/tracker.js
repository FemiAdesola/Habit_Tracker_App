// Habit Tracker with Persistent Theme Toggle

const newHabit = document.getElementById("newHabit");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const habitList = document.getElementById("habitList");
const totalEl = document.getElementById("total");
const tickedEl = document.getElementById("ticked");
const themeBtn = document.getElementById("themeToggle");

const KEY = "habit-tracker:v2";
const THEME_KEY = "habit-tracker:theme";

// initial state of hibit
let state = { habits: [] };
let selectedIndex = 0;

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

// for getting random bullet point to each habit column
function randomizeTheColor() {
  const c = [
    "#60a5fa",
    "#fb7185",
    "#f59e0b",
    "#34d399",
    "#c084fc",
    "#f472b6",
    "#242121ff",
    "#7e8b1b58"
  ];
  return c[Math.floor(Math.random() * c.length)];
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

// Utils
const isoDate = (d = new Date()) => {
  return d.toLocaleDateString("en-CA", { timeZone: "Europe/Helsinki" }); // YYYY-MM-DD in Finland time
};

const TODAY = () => isoDate();
function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

// Habit functions CRUD

// Adding habit function
function addHabit(name) {
  name = name.trim();
  if (!name) return;
  state.habits.push({ id: uid(), name, color: randomizeTheColor(), ticks: [] });
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

// Function to take current streak
function currentStreak(h) {
  const s = new Set(h.ticks);
  let count = 0,
    day = new Date();
  while (s.has(isoDate(day))) {
    count++;
    day.setDate(day.getDate() - 1);
  }
  return count;
}

// Function to take best streak
function bestStreak(h) {
  if (!h.ticks.length) return 0;
  const days = [...new Set(h.ticks)].sort();
  let best = 1,
    curr = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = new Date(days[i - 1]);
    const cur = new Date(days[i]);
    if ((cur - prev) / 86400000 === 1) curr++;
    else {
      best = Math.max(best, curr);
      curr = 1;
    }
  }
  return Math.max(best, curr);
}

function hasTick(h, date) {
  return h.ticks.includes(date);
}

// for make the habit card to be toggled and when click the date it turn green
function toggleToday(id) {
  const h = state.habits.find((h) => h.id === id);
  if (!h) return;
  const today = TODAY();
  const i = h.ticks.indexOf(today);
  if (i >= 0) h.ticks.splice(i, 1);
  else h.ticks.push(today);
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
        <div class="muted small">
            Current: ${currentStreak(h)}<br>
            Best: ${bestStreak(h)}
        </div>
    `;

    const days = document.createElement("div");
    days.className = "days";
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const dISO = d.toLocaleDateString("en-CA", {
        timeZone: "Europe/Helsinki",
      }); // gives YYYY-MM-DD
      const [year, month, day] = dISO.split("-");

      const btn = document.createElement("button");
      btn.className = "day";
      btn.textContent = `${day}.${month}`; // shows DD-MM
      if (hasTick(h, dISO)) btn.classList.add("ticked");
      if (dISO === TODAY()) btn.classList.add("today");
      if (dISO === TODAY()) btn.onclick = () => toggleToday(h.id);
      else {
        btn.disabled = true;
        btn.style.opacity = 0.6;
      }
      days.appendChild(btn);
    }

    // For rendering delet the habit
    const del = document.createElement("button");
    del.className = "ghost small";
    del.textContent = "🗑";
    del.onclick = () => {
      if (confirm(`Delete "${h.name}"?`)) removeHabit(h.id);
    };

    // For appending the habit
    row.append(left, days, del);
    row.onclick = () => {
      selectedIndex = idx;
      render();
    };

    habitList.appendChild(row);
  });

  totalEl.textContent = state.habits.length;
  tickedEl.textContent = state.habits.filter((h) => hasTick(h, TODAY())).length;
  save();
}
//////////

// Events
addBtn.onclick = () => {
  addHabit(newHabit.value);
  newHabit.value = "";
  newHabit.focus();
};

// Init
load();
render();
