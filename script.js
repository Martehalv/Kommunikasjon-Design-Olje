const section = document.querySelector(".scrollytelling");
const steps = section.querySelectorAll(".step");
const textDisplay = section.querySelector(".text-display");
const background = section.querySelector(".background");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  const vh = window.innerHeight;
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionBottom = sectionTop + sectionHeight;

  // utenfor hele seksjonen → skjul alt
  if (y < sectionTop || y > sectionBottom) {
    textDisplay.style.opacity = 0;
    steps.forEach((s) => s.classList.remove("active"));
    return;
  }

  // finn hvilket "step" som er aktivt nå
  let activeStep = -1;
  steps.forEach((step, i) => {
    const stepTop = sectionTop + i * vh;
    const stepBottom = stepTop + vh;
    if (y >= stepTop && y < stepBottom) {
      activeStep = i;
    }
  });

  // vis gjeldende tekst eller blå boks
  steps.forEach((step, i) => {
    const isSpecial = step.classList.contains("special-step");

    if (i === activeStep) {
      if (isSpecial) {
        step.classList.add("active");
        textDisplay.style.opacity = 0;
      } else {
        textDisplay.textContent = step.dataset.text;
        textDisplay.style.opacity = 1;
      }
    } else {
      if (isSpecial) step.classList.remove("active");
    }
  });
});

// --- Brede seksjon animasjon ---
const bredeSection = document.querySelector(".section-brede");
const popup = document.getElementById("rlwi-info");
const rlwiWord = document.querySelector(".rlwi");

function checkVisibility() {
  const rect = bredeSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
    bredeSection.classList.add("visible");
  }
}

window.addEventListener("scroll", checkVisibility);
checkVisibility();

// --- Popup-boksen ---
rlwiWord.addEventListener("click", (e) => {
  popup.style.display = popup.style.display === "block" ? "none" : "block";
  e.stopPropagation();
});

document.body.addEventListener("click", () => {
  popup.style.display = "none";
});
