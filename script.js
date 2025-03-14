// 🚀 Firebase Config (Replace with your own)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google Login
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("landing-page").classList.remove("hidden");
        document.getElementById("user-name").innerText = result.user.displayName;
    }).catch(error => {
        console.error(error);
    });
}

// Logout
function logout() {
    auth.signOut().then(() => {
        document.getElementById("landing-page").classList.add("hidden");
        document.getElementById("login-page").classList.remove("hidden");
    });
}

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
