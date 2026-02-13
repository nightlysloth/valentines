const startBtn = document.getElementById("startBtn");
const challenge1 = document.getElementById("challenge1");
const memorySection = document.getElementById("memorySection");
const freakySection = document.getElementById("freakySection");
const finalLetter = document.getElementById("finalLetter");

let tapCount = 0;

startBtn.addEventListener("click", () => {
  document.querySelector(".hero").classList.add("hidden");
  challenge1.classList.remove("hidden");
});

function checkAnswer1() {
  const answer = document.getElementById("answer1").value.toLowerCase();
  if (answer.includes("march")) {
    challenge1.classList.add("hidden");
    memorySection.classList.remove("hidden");
  } else {
    alert("Hint: The month our story began ❤️");
  }
}

function checkAnswer2() {
  const answer = document.getElementById("answer2").value;
  if (answer.includes("3")) {
    memorySection.classList.add("hidden");
    freakySection.classList.remove("hidden");
  } else {
    alert("Hint: August 3 😉");
  }
}

document.getElementById("tapHeart").addEventListener("click", () => {
  tapCount++;
  if (tapCount >= 5) {
    freakySection.classList.add("hidden");
    finalLetter.classList.remove("hidden");
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }
});
