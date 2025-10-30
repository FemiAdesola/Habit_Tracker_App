# 🌿 Habit Tracker

A lightweight, fast **habit tracker** built with **Vanilla JavaScript**, **CSS**, and **localStorage**.  
It helps to build consistency with streaks, keyboard shortcuts, and a persistent theme toggle — all in a single-page web app.

> The Habit Tracker helps users build consistency, monitor progress, stay motivated, develop discipline, visualize improvement, and maintain accountability for achieving personal growth goals.

> The instructions provided here apply to both Windows and Mac users.

  **Clone the repository**
   ```bash
   git clone https://github.com/FemiAdesola/Habit_Tracker_App.git 

   cd Habit_Tracker_App
   ```

Windows (CMD)
```bash
mkdir Habit_Tracker_App
cd Habit_Tracker_App  
code .   REM opens VS Code if available 
```



macOS (Terminal)
```bash
mkdir -p Habit_Tracker_App
cd Habit_Tracker_App
code .   # opens VS Code if available
```

View the website link [here](https://femi-habit-tracker.netlify.app/)


![Habit Tracker Screenshot](/img/HabitPage.png)

>The image shows a web-based application called "Habit Tracker" which is used to log and monitor daily habits. 
  * In this image I have set up Eight habits to track: Read, Lecture, Meditate, Exercise, Coding, Bible Study, Eating, and Assignments.
  * The tracker displays the current and best streaks for each habit.
  * The interface allows the user to mark habits as completed for a given day, with a history for the past week shown.
  * The application also includes keyboard shortcuts for adding new habits and marking them as complete.

---

## ✨ Features

- 🧱 **Vanilla JS only** — no frameworks, just modern JavaScript  
- 💾 **LocalStorage persistence** — all data (habits, streaks, and theme) is saved locally  
- 🌗 **Persistent theme toggle** — remembers the dark/light preference  
- ⚡ **Keyboard controls**  
  - `n` — focus the new habit input  
  - `↑ / ↓` — navigate between habits  
  - `Space` — toggle today’s checkmark  
  - `Delete` — remove selected habit  
- 🔥 **Automatic streak tracking**
  - Computes current and best streaks  
  - Streaks based on the **local date** (Europe/Helsinki timezone in code)
- ✅ **Daily progress view**
  - Shows the past 7 days for each habit  
  - Only today’s cell is clickable to prevent backtracking
- 🧹 **Quick clear** — reset all data with one click  
- 📱 **Responsive design** — works beautifully on desktop and mobile
- 📅 Responsive layout (desktop & mobile)

## 🛠 Tech Stack
- HTML5
- CSS3 (custom properties, responsive layout)
- Vanilla JavaScript (ES6)
- localStorage persistence

## 📁 Project Structure

```bash
habit-tracker/
│
├── assets/
│   └── tracker.css
├── img/
│   ├── DeleteMessage.png
│   ├── FrontDark.png
│   ├── FrontDark.png
│   ├── HabitPage.png
│   └── JSON.png
├── js/
│   └── tracker.js
├── index.html
└── README.md
```
## 🚀 How to Use

1. **Clone or download** this repo  
   ```bash
   git clone https://github.com/yourusername/habit-tracker.git
   cd habit-tracker
   ```

2. **Open** `index.html` in your browser — no build step needed.  
   Everything runs locally.

3. **Add habits**, toggle them daily, and watch your streaks grow!  
   The app automatically saves your progress and theme choice.
---

## 🧠 Technical Highlights

- **Data persistence:**  
  ```js
  localStorage.setItem("habit-tracker:v2", JSON.stringify(state));
  ```
- **Theme persistence:**  
  ```js
  localStorage.setItem("habit-tracker:theme", theme);
  ```
- **Timezone-safe date:**  
  ```js
  d.toLocaleDateString("en-CA", { timeZone: "Europe/Helsinki" });
  ```
- **Minimal re-renders:**  
  State changes trigger a full re-render of the habit list for simplicity.

## 🧩 Customization

- To **change the timezone**, update the `timeZone` property in `isoDate()`.
- To **add more theme colors**, modify the CSS variables in `tracker.css`:
  ```css
  :root {
    --accent: #60a5fa;
    --success: #34d399;
  }
  ```
- To **preload sample habits**, edit this section in `tracker.js`:
  ```js
  if (!state.habits.length) ["Read", "Meditate", "Exercise"].forEach(addHabit);
  ```

  ## 🧰 Details Usage

### Adding a Habit
1. Type a habit name in the input box.  
  * For example, type a habit name (e.g., “Drink Water”).
2. Press **Enter** or click **+**.  
3. It appears in your habit list with its own color.

### Marking Today as Done
- Click on today’s date box or press **Space** (with habit selected).
  * Today’s date box to mark completion.
  * The box turns green to indicate success.

### View Streaks
- Each habit shows your Current and Best streaks automatically.

### Navigating Habits
- Use **↑ / ↓** to move between habits.  
  * Arrow Up / Down → Navigate habits
- Press **Delete** to remove the selected one.
- Enter → Add new habit
- Space → Toggle today’s tick (when selected)

### Clearing All Habits
- Click **Clear** and confirm the prompt to start fresh.
![DeleteMessage](/img/DeleteMessage.png)

### Toggling Theme
- Click the **🌙 / ☀️** icon in the header  to switch themes.
  * The preference is saved automatically.

---
### Export / Import Data

- **Export JSON**: Downloads your current habits and logs.

#### Exporting  Data
> You can export the entire habit list and progress to a JSON file.

+ Example:
   * Click Export Data (the **Export** button).
   * A file named habits-export.json will download automatically.
```json


   {
  "habits": [
    {
    "id": "abc123",
    "name": "Read",
    "color": "#60a5fa",
    "ticks": [
      "2025-10-15", 
      "2025-10-16"
      ]
  },
  {
    "id": "xyz789",
    "name": "Exercise",
    "color": "#fb7185",
    "ticks": []
  }
  ]
}
```
#### Importing Data
- **Import JSON**: Upload a JSON file exported previously to restore habits.
+ To restore previously exported habits:
   * Click the Import JSON button.
   * Choose a file like habits-export.json.
   * The app will automatically load and display the saved habits.

* Example of Valid Import File
   + Make sure your JSON matches this structure:
```json
{
  "habits": [
    {
    "id": "abc123",
    "name": "Read",
    "color": "#60a5fa",
    "ticks": ["2025-10-15", "2025-10-16"]
  },
  {
    "id": "xyz789",
    "name": "Exercise",
    "color": "#fb7185",
    "ticks": [
    "2025-10-15"
    ]
  }
  ]
}

```

---


### Example row:
```js
  1,"Coding",#242121ff,2025-10-010;2025-10-11
```
![JSON file](/img/JSON.png)

## 📸 Dark and Light Theme

| Dark Theme | Light Theme |
|-------------|--------------|
| ![Dark mode](/img/FrontDark.png) | ![Light mode](/img/FrontLight.png) |