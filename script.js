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

  // utenfor hele området
  if (y < sectionTop || y >= sectionBottom) {
    background.style.opacity = 0;
    textDisplay.style.opacity = 0;
    steps.forEach((s) => (s.style.opacity = 0));
    return;
  }

  background.style.opacity = 1;

  // finn hvilket step som gjelder
  let activeStep = -1;
  steps.forEach((step, i) => {
    const stepTop = sectionTop + i * vh;
    const stepBottom = stepTop + vh;
    if (y >= stepTop && y < stepBottom) activeStep = i;
  });

  // nullstill
  steps.forEach((s) => (s.style.opacity = 0));
  textDisplay.style.opacity = 0;

  if (activeStep >= 0) {
    const step = steps[activeStep];
    if (step.classList.contains("special-step")) {
      // vis blå boks
      step.style.opacity = 1;
    } else {
      // vis vanlig tekst
      textDisplay.textContent = step.dataset.text;
      textDisplay.style.opacity = 1;
    }
  }

  // fade ut alt helt på slutten
  const lastStepEnd = sectionTop + steps.length * vh;
  if (y >= lastStepEnd - vh * 0.2) {
    background.style.opacity = 0;
    steps[steps.length - 1].style.opacity = 0;
  }
});
