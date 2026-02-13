let currentStep = 0;
const totalSteps = 7;
const letterContent = `My dear Kuchupuchu Wifey, Sugarplum, Pookie, Cutie, Sweetie,

Looking back at where we started in March, I never imagined I would fall this deeply, this hopelessly — and sometimes this freakily — in love with you.

You are not just my girlfriend.
You are my safe place.
My late-night conversation partner.
My chocolate thief.
My teddy-bear cuddler.
My everything.

Every random 2AM conversation reminds me that love isn’t just about romance — it’s about connection. You’re the one who turns simple late-night talks into core memories.

What I love most about you isn’t only how stunningly beautiful you are (though, wow… you really are).
It’s your soul.

It’s the way you tolerate my cheesiness.
The way you laugh at our inside jokes.
The way you stand by me when I’m being a complete mess.

I love how you laugh.
I love how dramatic and adorable you can be.
I love how you pretend to be mad but melt in seconds.
I love how deeply you care.
I love that you exist.

You are my chaos and my calm.
My peace and my excitement.
My wild and my soft.
My babieeeee forever.

And if life ever tests us, I want you to remember this:

I will choose you.
Again.
And again.
And again.

Not just today.
Not just this Valentine’s.
But every single day.

Thank you for loving me.
Thank you for being mine.
Thank you for letting me be yours.

I love you more than words can ever fit into a webpage.`;

// Navigation Logic
function nextSection(step) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    const next = document.getElementById(step === 'final' ? 'final-letter' : `section-${step}`);
    if(next) next.classList.remove('hidden'), next.classList.add('active');
    
    currentStep = step === 'final' ? 7 : step;
    updateProgress();
    
    if(step === 1) initHeartGame();
    if(step === 3) initMemoryGame();
    if(step === 'final') startTypewriter();
    
    // Audio Start on first interaction
    const music = document.getElementById('bg-music');
    if(music.paused) music.play();
}

function updateProgress() {
    const percent = (currentStep / totalSteps) * 100;
    document.getElementById('progress-bar').style.width = percent + '%';
}

// Game 1: Heart Catch
function initHeartGame() {
    let score = 0;
    const area = document.getElementById('heart-game-area');
    const interval = setInterval(() => {
        if(score >= 5) { clearInterval(interval); return; }
        const h = document.createElement('div');
        h.innerHTML = '💖';
        h.className = 'falling-heart';
        h.style.left = Math.random() * 80 + '%';
        h.style.top = '100%';
        area.appendChild(h);
        
        h.animate([{ top: '100%' }, { top: '0%' }], { duration: 3000 });
        h.onclick = () => {
            score++;
            document.getElementById('heart-score').innerText = score;
            h.remove();
            if(score === 5) showUnlock(2);
        };
    }, 1000);
}

// Game 2: Quiz
function checkQuiz(isCorrect) {
    if(isCorrect) showUnlock(3);
    else alert("Try again, my love!");
}

// Game 3: Memory
function initMemoryGame() {
    const grid = document.getElementById('memory-grid');
    const icons = ['💍', '🌹', '💍', '🌹'];
    icons.sort(() => Math.random() - 0.5);
    let flipped = [];
    grid.innerHTML = '';
    
    icons.forEach((icon, i) => {
        const card = document.createElement('div');
        card.className = 'mem-card';
        card.dataset.icon = icon;
        card.innerText = icon;
        card.onclick = () => {
            if(flipped.length < 2 && !card.classList.contains('flipped')) {
                card.classList.add('flipped');
                flipped.push(card);
                if(flipped.length === 2) {
                    if(flipped[0].dataset.icon === flipped[1].dataset.icon) {
                        flipped = [];
                        if(document.querySelectorAll('.flipped').length === 4) showUnlock(4);
                    } else {
                        setTimeout(() => {
                            flipped.forEach(c => c.classList.remove('flipped'));
                            flipped = [];
                        }, 1000);
                    }
                }
            }
        };
        grid.appendChild(card);
    });
}

// Game 4: Tap Speed
let tapActive = true;
document.getElementById('tap-game-target').onclick = function() {
    if(tapActive) {
        this.style.background = '#ff4d6d';
        this.innerText = "AMAZING!";
        setTimeout(() => showUnlock(5), 500);
        tapActive = false;
    }
};

// Game 5: Swipe
let isDown = false;
const scratch = document.getElementById('scratch');
scratch.addEventListener('touchstart', () => isDown = true);
scratch.addEventListener('touchmove', (e) => {
    if(isDown) {
        scratch.style.opacity = '0.2';
        setTimeout(() => {
            scratch.style.display = 'none';
            showUnlock(6);
        }, 1000);
    }
});

// Game 6: Spinner
function spinWheel() {
    const s = document.getElementById('spinner');
    s.style.transform = 'rotate(1080deg)';
    setTimeout(() => {
        s.innerText = '100% Soulmates';
        s.style.fontSize = '1.5rem';
        setTimeout(() => showUnlock('final'), 1500);
    }, 2000);
}

// Transition Modal
function showUnlock(next) {
    const modal = document.getElementById('unlock-modal');
    modal.classList.remove('hidden');
    modal.querySelector('button').onclick = () => {
        modal.classList.add('hidden');
        nextSection(next);
    };
}

// Typewriter
function startTypewriter() {
    const el = document.getElementById('typewriter-text');
    let i = 0;
    const lines = letterContent.split('\n');
    
    function writeLine() {
        if (i < lines.length) {
            el.innerHTML += lines[i] + "<br>";
            i++;
            setTimeout(writeLine, 1500); // Cinematic speed
            el.parentElement.scrollTop = el.parentElement.scrollHeight;
        } else {
            document.getElementById('signature').classList.remove('hidden');
        }
    }
    writeLine();
}

// Music Control
document.getElementById('music-control').onclick = () => {
    const music = document.getElementById('bg-music');
    music.paused ? music.play() : music.pause();
};
