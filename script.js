// Start Lock-In Mode
function startLockIn() {
    document.getElementById("landing-page").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    loadChart();
    loadGoals();
    generateQuote();
}

// To-Do List Functions
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") return;

    let li = document.createElement("li");
    li.innerHTML = taskInput.value + '<button onclick="removeTask(this)">❌</button>';
    taskList.appendChild(li);
    taskInput.value = "";
}

function removeTask(button) {
    button.parentElement.remove();
}

// Progress Graph Chart.js
function loadChart() {
    let ctx = document.getElementById("progressChart").getContext("2d");
    new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["Academics", "Physical", "Spirituality", "Mental", "Social"],
            datasets: [{
                label: "Your Progress",
                data: [80, 60, 70, 75, 50],
                backgroundColor: "rgba(255, 77, 0, 0.5)",
                borderColor: "#ff4d00",
                borderWidth: 2
            }]
        },
        options: { responsive: true, scale: { ticks: { beginAtZero: true } } }
    });
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Focus Timer
let timer;
let timeLeft = 1500; // 25 minutes in seconds

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = null;
                alert("Time's up! Take a break.");
            } else {
                timeLeft--;
                document.getElementById("timer").innerText = formatTime(timeLeft);
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeLeft = 1500;
    document.getElementById("timer").innerText = "25:00";
}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Daily Goals Tracker
function saveGoals() {
    let goals = {};
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox, index) => {
        goals[`goal${index}`] = checkbox.checked;
    });
    localStorage.setItem("goals", JSON.stringify(goals));
}

function loadGoals() {
    let savedGoals = JSON.parse(localStorage.getItem("goals")) || {};
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox, index) => {
        checkbox.checked = savedGoals[`goal${index}`] || false;
    });
}

// Motivational Quote Generator
function generateQuote() {
    const quotes = [
        "Discipline is the bridge between goals and accomplishment.",
        "Focus on what matters and let go of distractions.",
        "You become what you consistently do."
    ];
    document.getElementById("quote").innerText = quotes[Math.floor(Math.random() * quotes.length)];
}
