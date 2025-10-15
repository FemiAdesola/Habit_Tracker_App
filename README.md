# 🌿 Habit Tracker

A lightweight, fast **habit tracker** built with **Vanilla JavaScript**, **CSS**, and **localStorage**.  
It helps to build consistency with streaks, keyboard shortcuts, and a persistent theme toggle — all in a single-page web app.

> The Habit Tracker helps users build consistency, monitor progress, stay motivated, develop discipline, visualize improvement, and maintain accountability for achieving personal growth goals.

> The instructions provided here apply to both Windows and Mac users.

View the website link [here](https://femi-habit-tracker.netlify.app/)


![Habit Tracker Screenshot](/img/HabitPage.png)

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
│   └── HabitPage.png
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
## 📤 Exporting Habits (CSV)
- Export all the habits (including streak data) to a **.csv** file for backup or sharing.

### How to Export:
- Click the Export button.
  * A file named habits.csv will be downloaded automatically.
  * It includes:
    ```bash
      id,name,color,ticks
      1,"Drink Water",#34d399,2025-10-08;2025-10-09
      2,"Read Book",#60a5fa,2025-10-07
    ```
  * Note: Ticks are dates (ISO format) separated by ;.

## 📥 Importing Habits (CSV)
- Import a **.csv** file (previously exported or shared).
- When importing, data merges intelligently:

| Case | Behavior |
|-------------|--------------|
| Habit with same name exists | Merges tick dates (no duplicates) |
| Habit is new | Added as a new entry |

### How to Import:
- Click the Import button.
  * Select your .csv file.
  * Wait for the confirmation message.
  * Imported habits appear merged with existing ones.

### ✅ Example:
- Existing habit “Drink Water” has ticks on 2025-10-08.
- Imported file has “Drink Water” ticked on 2025-10-09.
- After import → habit shows **both** days ticked.

##  CSV Format Specification
| Column | Description |
|-------------|--------------|
| id | nique identifier (string or UUID) |
| name | abit name (string) |
| color | ex color code |
| ticks | Semicolon-separated list of ISO dates |

### Example row:
```js
  1,"Coding",#242121ff,2025-10-010;2025-10-11
```
![CSV file](/img/CSV.png)

## 📸 Dark and Light Theme

| Dark Theme | Light Theme |
|-------------|--------------|
| ![Dark mode](/img/FrontDark.png) | ![Light mode](/img/FrontLight.png) |