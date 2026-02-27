# Life Calendar Lock Screen Wallpaper

A fully automated iPhone lock screen wallpaper that visualizes the current year as a grid of days.

The wallpaper updates automatically at 00:00 IST using GitHub Actions and is served via GitHub Pages.

---

## ✨ Features

- iPhone 15 portrait resolution (1179 × 2556)
- Lock screen safe layout (does not clash with clock or widgets)
- Dynamic year grid (one dot per day)
- Current day highlighted
- Bottom stats:
  - % of year completed
  - ISO week number
- Fully automated daily update
- No third-party API dependencies

---

## 🛠 Tech Stack

- Node.js
- Canvas API
- GitHub Actions (cron automation)
- GitHub Pages (static image hosting)

---

## 🔄 How It Works

1. GitHub Action runs daily at:
**00:00 IST** (cron: `30 18 * * *`)
2. The script:
    - Calculates date using Asia/Kolkata timezone
    - Generates updated PNG
    - Commits the image to `/output`

3. GitHub Pages serves the latest image at:
https://Saumyadeep4.github.io/life-calendar-wallpaper/wallpaper3.png

4. iPhone Shortcut pulls the image and sets it as Lock Screen wallpaper.

---

## 📱 iPhone Setup

Create an automation in Shortcuts:

**Trigger**
- Time of Day → 00:01 AM

**Actions**
1. Get Contents of URL  
→ `https://Saumyadeep4.github.io/life-calendar-wallpaper/wallpaper3.png`

2. Set Wallpaper  
→ Lock Screen  
→ Disable "Ask Before Running"

---

## 🚀 Local Development

* Install dependencies:
`npm install`
* Generate wallpaper locally:
`node generate.js`
* Output will be saved to:
`output/wallpaper3.png`

---

## ⚙ GitHub Workflow

* Workflow file:
`.github/workflows/generate.yml`

* Runs daily and pushes updated image automatically.

* Ensure repository settings:
    - Actions → Workflow permissions → **Read and write**
    - Pages → Deploy from branch → `main` → `/output`

---

## 📌 Notes

- Timezone forced to `Asia/Kolkata`
- Resolution currently optimized for iPhone 15
- Designed specifically to avoid lock screen clock & widget overlap
- GitHub Actions execution may be delayed by a few minutes

---

## 📈 Future Improvements

- Multi-device resolution presets
- Theme switching (dark / AMOLED / minimal)
- Life-calendar mode (based on DOB)
- Hourly update version
- Progress bar option
- Year transition animation logic

---

Built as an experiment in automated lock screen design and GitHub-based deployment workflows.
