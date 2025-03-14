// 🚀 Firebase Config (Replace with your own)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCByv4Tp7hUghjjg77rDlo38we7Okvxa0k",
  authDomain: "lock-in-a1829.firebaseapp.com",
  projectId: "lock-in-a1829",
  storageBucket: "lock-in-a1829.firebasestorage.app",
  messagingSenderId: "185911175769",
  appId: "1:185911175769:web:82bb66ceb9d7038e939f48",
  measurementId: "G-1E2R9PCXVR"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔐 Enable Persistent Login
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Persistence enabled");
    })
    .catch(error => console.error("Error enabling persistence:", error));

// 🟢 Google Sign-In Function
function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then(result => {
            const user = result.user;
            localStorage.setItem("user", JSON.stringify(user)); // Save user in local storage
            window.location.href = "dashboard.html"; // Redirect to dashboard
        })
        .catch(error => console.error("Error signing in:", error));
}

// 🟡 Auto Login (Check if user is already logged in)
onAuthStateChanged(auth, user => {
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log("User already logged in:", user);
    } else {
        console.log("No user logged in.");
    }
});

// Logout
function logout() {
    auth.signOut().then(() => {
        document.getElementById("landing-page").classList.add("hidden");
        document.getElementById("login-page").classList.remove("hidden");
    });
}

// 🟢 Auto-Fill User Info (Optional: Show Username)
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("user-name").textContent = `Welcome, ${user.displayName}!`;
    }
});

// Lock-In Mode
function startLockIn() {
    document.getElementById("landing-page").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    generateResources();
    loadJournal();
    loadLeaderboard();
}

// Distraction Blocker
function enableBlocker() {
    const blockedSites = ["youtube.com", "instagram.com", "tiktok.com", "twitter.com"];
    setInterval(() => {
        blockedSites.forEach(site => {
            if (window.location.href.includes(site)) {
                window.location.href = "about:blank";
            }
        });
    }, 1000);
}

// Music Player
function playMusic() {
    let selectedTrack = document.getElementById("musicSelect").value;

    if (selectedTrack === "lofi") {
        document.getElementById("youtubePlayer").classList.remove("hidden");
        document.getElementById("focusMusic").pause();
    } else {
        document.getElementById("youtubePlayer").classList.add("hidden");
        let music = document.getElementById("focusMusic");
        music.src = selectedTrack;
        music.play();
    }
}

function stopMusic() {
    document.getElementById("focusMusic").pause();
    document.getElementById("youtubePlayer").classList.add("hidden");
}

// Journal
function saveJournal() {
    let entry = document.getElementById("journalEntry").value;
    localStorage.setItem("journal", entry);
    alert("Journal saved! ✅");
}

function loadJournal() {
    let savedEntry = localStorage.getItem("journal");
    if (savedEntry) document.getElementById("journalEntry").value = savedEntry;
}

// Resources
function generateResources() {
    let resources = [
        { title: "Atomic Habits", link: "https://amzn.to/3XYZ" },
        { title: "Deep Work", link: "https://amzn.to/3ABC" },
        { title: "Bhagavad Gita", link: "https://bhagavadgita.io/" }
    ];
    let list = document.getElementById("resourcesList");
    list.innerHTML = "";
    resources.forEach(res => {
        let item = document.createElement("li");
        item.innerHTML = `<a href="${res.link}" target="_blank">${res.title}</a>`;
        list.appendChild(item);
    });
}

// Leaderboard
function loadLeaderboard() {
    let friends = [{ name: "Soral", streak: 8 }, { name: "Aryan", streak: 5 }, { name: "You", streak: 7 }];
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";
    friends.forEach(friend => {
        let item = document.createElement("li");
        item.innerText = `${friend.name} - 🔥 ${friend.streak} days streak`;
        leaderboard.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");

    // Check if dark mode was previously enabled
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    // Toggle Theme on Button Click
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});
