const { createCanvas } = require("canvas");
const fs = require("fs");

// iPhone 15 portrait resolution
const width = 1179;
const height = 2556;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// ----------------------
// Background
// ----------------------
const gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, "#0f2027");
gradient.addColorStop(1, "#203a43");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// ----------------------
// Date Logic (Force IST)
// ----------------------
const today = new Date(
  new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
);

const start = new Date(today.getFullYear(), 0, 0);
const diff = today - start;
const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

const isLeap =
  new Date(today.getFullYear(), 1, 29).getMonth() === 1;
const daysInYear = isLeap ? 366 : 365;

const percentComplete = ((dayOfYear / daysInYear) * 100).toFixed(1);

// ISO Week Number
const tempDate = new Date(today.valueOf());
const dayNum = (today.getDay() + 6) % 7;
tempDate.setDate(tempDate.getDate() - dayNum + 3);
const firstThursday = tempDate.valueOf();
tempDate.setMonth(0, 1);
if (tempDate.getDay() !== 4) {
  tempDate.setMonth(0, 1 + ((4 - tempDate.getDay()) + 7) % 7);
}
const weekNumber =
  1 + Math.ceil((firstThursday - tempDate) / 604800000);

// ----------------------
// Layout Safe Zones
// ----------------------
const topSafeArea = height * 0.32;      // space for clock
const bottomSafeArea = height * 0.28;   // space for widgets
let currentY = topSafeArea;

// ----------------------
// Grid Settings
// ----------------------
const sidePadding = 160;
const cols = 18;
const dotSize = 26;

const availableWidth = width - sidePadding * 2;
const gap = (availableWidth - (cols * dotSize)) / (cols - 1);

const gridWidth = (cols * dotSize) + ((cols - 1) * gap);
const offsetX = (width - gridWidth) / 2;

const rows = Math.ceil(daysInYear / cols);

const gridHeight = (rows * dotSize) + ((rows - 1) * gap);
const availableHeight = height - topSafeArea - bottomSafeArea;
currentY = topSafeArea + (availableHeight - gridHeight) / 2;

// ----------------------
// Bottom Center Stats
// ----------------------
const bottomCenterY = height - (bottomSafeArea / 1.2);

ctx.textAlign = "center";

// % Completed
ctx.fillStyle = "rgba(255,255,255,0.85)";
ctx.font = "600 60px Helvetica";
ctx.fillText(`${percentComplete}% of year complete`, width / 2, bottomCenterY - 40);

// Week Number
ctx.fillStyle = "rgba(255,255,255,0.6)";
ctx.font = "400 42px Helvetica";
ctx.fillText(`Week ${weekNumber}`, width / 2, bottomCenterY + 30);

// ----------------------
// Draw Grid
// ----------------------
let count = 0;

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (count >= daysInYear) break;

    const x = offsetX + c * (dotSize + gap);
    const y = currentY + r * (dotSize + gap);

    ctx.beginPath();
    ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);

    if (count < dayOfYear - 1) {
      ctx.fillStyle = "#cfd8dc";
      ctx.shadowBlur = 0;
    } else if (count === dayOfYear - 1) {
      ctx.fillStyle = "#00ffe1";
      ctx.shadowColor = "#00ffe1";
      ctx.shadowBlur = 35;
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      ctx.shadowBlur = 0;
    }

    ctx.fill();
    ctx.shadowBlur = 0;
    count++;
  }
}

// ----------------------
// Save
// ----------------------
if (!fs.existsSync("output")) {
  fs.mkdirSync("output");
}

fs.writeFileSync("output/wallpaper.png", canvas.toBuffer("image/png"));

console.log("Wallpaper generated successfully.");
