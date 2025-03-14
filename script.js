function startLockIn() {
    document.getElementById("landing-page").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    generateResources();
    loadJournal();
    loadLeaderboard();
}

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

function playMusic() {
    let music = document.getElementById("focusMusic");
    let selectedTrack = document.getElementById("musicSelect").value;
    music.src = selectedTrack;
    music.play();
}

function stopMusic() {
    document.getElementById("focusMusic").pause();
}

function saveJournal() {
    let entry = document.getElementById("journalEntry").value;
    localStorage.setItem("journal", entry);
    alert("Journal saved! ✅");
}

function loadJournal() {
    let savedEntry = localStorage.getItem("journal");
    if (savedEntry) document.getElementById("journalEntry").value = savedEntry;
}

function generateResources() {
    let resources = [
        { title: "Atomic Habits", link: "https://amzn.to/3XYZ" },
        { title: "Deep Work", link: "https://amzn.to/3ABC" },
        { title: "Bhagavad Gita", link: "https://bhagavadgita.io/" },
        { title: "Discipline Equals Freedom", link: "https://amzn.to/3DEF" }
    ];
    
    let list = document.getElementById("resourcesList");
    list.innerHTML = "";
    resources.forEach(res => {
        let item = document.createElement("li");
        item.innerHTML = `<a href="${res.link}" target="_blank">${res.title}</a>`;
        list.appendChild(item);
    });
}

function generateShareableLink() {
    let progress = {
        journal: localStorage.getItem("journal") || "No journal entry",
        tasksCompleted: Math.floor(Math.random() * 10) + 1
    };

    let encodedData = encodeURIComponent(JSON.stringify(progress));
    let shareableURL = `${window.location.origin}?data=${encodedData}`;
    document.getElementById("shareLink").innerHTML = `<a href="${shareableURL}" target="_blank">${shareableURL}</a>`;
}

function loadLeaderboard() {
    let friends = [
        { name: "Soral", streak: 8 },
        { name: "Aryan", streak: 5 },
        { name: "You", streak: 7 }
    ];
    
    let leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = "";
    friends.sort((a, b) => b.streak - a.streak);
    
    friends.forEach(friend => {
        let item = document.createElement("li");
        item.innerText = `${friend.name} - 🔥 ${friend.streak} days streak`;
        leaderboard.appendChild(item);
    });
}
