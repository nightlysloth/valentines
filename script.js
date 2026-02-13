let currentSection = 0;
let progress = 0;

const sections = document.querySelectorAll(".section");
const progressFill = document.getElementById("progressFill");
const music = document.getElementById("bgMusic");

function startJourney() {
    music.play().catch(()=>{});
    nextSection();
}

function nextSection() {
    sections[currentSection].classList.remove("active");
    currentSection++;
    sections[currentSection].classList.add("active");
    progress += 14;
    progressFill.style.width = progress + "%";
}

/* Heart Catch Game */
let heartScore = 0;
const heartContainer = document.getElementById("heartContainer");
const heartScoreEl = document.getElementById("heartScore");

if(heartContainer){
    setInterval(()=>{
        if(currentSection===1){
            let heart = document.createElement("div");
            heart.innerHTML = "💖";
            heart.style.position="absolute";
            heart.style.left=Math.random()*90+"%";
            heart.style.top=Math.random()*80+"%";
            heart.style.fontSize="24px";
            heart.onclick=()=>{
                heart.remove();
                heartScore++;
                heartScoreEl.innerText=heartScore;
                if(heartScore>=10) nextSection();
            };
            heartContainer.appendChild(heart);
            setTimeout(()=>heart.remove(),2000);
        }
    },800);
}

/* Quiz Game */
const quizContainer = document.getElementById("quizContainer");
if(quizContainer){
    quizContainer.innerHTML=`
    <p>When did we start?</p>
    <button onclick="correctQuiz()">March</button>
    <button>January</button>
    `;
}

function correctQuiz(){
    nextSection();
}

/* Tap Game */
const tapOptions=document.getElementById("tapOptions");
if(tapOptions){
    tapOptions.innerHTML=`
    <button>You're okay</button>
    <button onclick="nextSection()">You're my everything</button>
    <button>You're decent</button>
    `;
}

/* Swipe Game */
const swipeBox=document.getElementById("swipeBox");
if(swipeBox){
    swipeBox.addEventListener("touchmove",(e)=>{
        nextSection();
    });
}

/* Spinner */
function spin(){
    const result=document.getElementById("spinResult");
    result.innerText="100% Soulmate Energy 💞";
    setTimeout(()=>nextSection(),1000);
}

/* Final Unlock */
function unlockFinal(){
    nextSection();
    typeLetter();
}

/* Typewriter */
function typeLetter(){
const text=`My dear Kuchupuchu Wifey, Sugarplum, Pookie, Cutie, Sweetie,

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

I love you more than words can ever fit into a webpage.

Forever yours,
Prateek`;

let i=0;
const letter=document.getElementById("letter");
const interval=setInterval(()=>{
    letter.innerHTML+=text.charAt(i);
    i++;
    if(i>=text.length) clearInterval(interval);
},35);
}
