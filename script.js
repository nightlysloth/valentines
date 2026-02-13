const gameState = {
    currentStep: 0,
    totalSteps: 7,
    score: 0
};

const letterLines = [
    "My dear Kuchupuchu Wifey, Sugarplum, Pookie, Cutie, Sweetie,",
    "",
    "Looking back at where we started in March, I never imagined I would fall this deeply, this hopelessly — and sometimes this freakily — in love with you.",
    "",
    "You are not just my girlfriend.",
    "You are my safe place.",
    "My late-night conversation partner.",
    "My chocolate thief.",
    "My teddy-bear cuddler.",
    "My everything.",
    "",
    "Every random 2AM conversation reminds me that love isn’t just about romance — it’s about connection. You’re the one who turns simple late-night talks into core memories.",
    "",
    "What I love most about you isn’t only how stunningly beautiful you are (though, wow… you really are).",
    "It’s your soul.",
    "",
    "It’s the way you tolerate my cheesiness.",
    "The way you laugh at our inside jokes.",
    "The way you stand by me when I’m being a complete mess.",
    "",
    "I love how you laugh.",
    "I love how dramatic and adorable you can be.",
    "I love how you pretend to be mad but melt in seconds.",
    "I love how deeply you care.",
    "I love that you exist.",
    "",
    "You are my chaos and my calm.",
    "My peace and my excitement.",
    "My wild and my soft.",
    "My babieeeee forever.",
    "",
    "And if life ever tests us, I want you to remember this:",
    "",
    "I will choose you.",
    "Again. And again. And again.",
    "",
    "Not just today. Not just this Valentine’s.",
    "But every single day.",
    "",
    "Thank you for loving me.",
    "Thank you for being mine.",
    "Thank you for letting me be yours.",
    "",
    "I love you more than words can ever fit into a webpage."
];

function nextSection(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    document.getElementById(nextId).classList.add('active');
    gameState.currentStep++;
    updateProgress();
}

function updateProgress() {
    const percent = (gameState.currentStep / gameState.totalSteps) * 100;
    document.getElementById('progress-bar').style.width = percent + '%';
}

function startJourney() {
    document.getElementById('bg-music').play().catch(() => console.log("User interaction required for audio"));
    nextSection('hero', 'game1');
    spawnHearts();
}

// Game 1 Logic
function spawnHearts() {
    const zone = document.getElementById('heart-zone');
    const interval = setInterval(() => {
        if (gameState.score >= 5) {
            clearInterval(interval);
            nextSection('game1', 'game2');
            return;
        }
        const h = document.createElement('div');
        h.className = 'falling-heart';
        h.innerHTML = '❤️';
        h.style.left = Math.random() * 80 + 10 + '%';
        h.onclick = () => {
            gameState.score++;
            document.getElementById('score1').innerText = gameState.score;
            h.remove();
        };
        zone.appendChild(h);
        setTimeout(() => h.remove(), 2000);
    }, 800);
}

// Game 2 Logic
let tilesRevealed = 0;
function revealTile(el) {
    if (!el.classList.contains('revealed')) {
        el.classList.add('revealed');
        el.innerText = '💖';
        tilesRevealed++;
        if (tilesRevealed === 4) setTimeout(() => nextSection('game2', 'game3'), 500);
    }
}

// Game 3 Logic
function checkQuiz(isCorrect) {
    if (isCorrect) nextSection('game3', 'game4');
    else alert("Try again, my love!");
}

// Game 4 Logic
let taps = 0;
function tapCompliment() {
    taps++;
    document.getElementById('comp-bar').style.width = (taps * 10) + '%';
    const words = ["STUNNING", "CUTE", "MINE", "PERFECT", "ANGEL"];
    document.getElementById('comp-btn').innerText = words[Math.floor(Math.random()*words.length)];
    if (taps >= 10) nextSection('game4', 'game5');
}

// Game 5 Logic
let startX;
document.getElementById('swipe-handle').addEventListener('touchstart', e => startX = e.touches[0].clientX);
document.getElementById('swipe-handle').addEventListener('touchmove', e => {
    let move = e.touches[0].clientX - startX;
    if (move > 150) {
        document.getElementById('swipe-handle').style.transform = 'translateX(200px)';
        document.getElementById('hidden-note').style.opacity = '1';
        setTimeout(() => nextSection('game5', 'game6'), 1500);
    }
});

// Game 6 Logic
function spin() {
    const s = document.getElementById('spinner');
    s.style.transition = 'transform 2s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
    s.style.transform = 'rotate(1080deg)';
    setTimeout(() => nextSection('game6', 'final-unlock'), 2500);
}

// Final Letter Logic
function startLetter() {
    nextSection('final-unlock', 'letter-section');
    typeWriter(0);
}

function typeWriter(lineIdx) {
    if (lineIdx < letterLines.length) {
        const container = document.getElementById('typewriter-text');
        const p = document.createElement('p');
        container.appendChild(p);
        let charIdx = 0;
        let line = letterLines[lineIdx];
        
        const timer = setInterval(() => {
            p.innerHTML += line[charIdx];
            charIdx++;
            if (charIdx === line.length) {
                clearInterval(timer);
                setTimeout(() => typeWriter(lineIdx + 1), 400);
            }
        }, 30);
    } else {
        document.getElementById('signature').classList.remove('hidden');
    }
}
