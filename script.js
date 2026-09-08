// ====== EDIT THESE DETAILS ======
const weddingDate = new Date("December 20, 2026 09:00:00").getTime();

// Opening animation
const opening = document.getElementById("opening");
const openBtn = document.getElementById("openBtn");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

document.body.classList.add("locked");

openBtn.addEventListener("click", async () => {
  opening.classList.add("hide");
  document.body.classList.remove("locked");

  // Browsers require music to begin after a user interaction.
  try {
    await music.play();
    musicBtn.textContent = "♫";
  } catch (e) {
    musicBtn.textContent = "♪";
  }
});

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "♫";
    } catch (e) {}
  } else {
    music.pause();
    musicBtn.textContent = "♪";
  }
});

// Countdown
function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll reveal
const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => observer.observe(item));

// Falling flower petals
const petals = document.getElementById("petals");

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "petal";

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = (5 + Math.random() * 7) + "s";
  petal.style.animationDelay = Math.random() * 2 + "s";
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;

  petals.appendChild(petal);

  setTimeout(() => petal.remove(), 15000);
}

setInterval(createPetal, 650);

// Golden sparkles
const sparkles = document.getElementById("sparkles");

for (let i = 0; i < 28; i++) {
  const spark = document.createElement("span");
  spark.className = "spark";
  spark.style.left = Math.random() * 100 + "vw";
  spark.style.top = Math.random() * 100 + "vh";
  spark.style.animationDelay = Math.random() * 3 + "s";
  spark.style.animationDuration = (1.8 + Math.random() * 2) + "s";
  sparkles.appendChild(spark);
}
