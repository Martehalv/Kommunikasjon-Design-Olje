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

// --- LIFE ON BOARD animasjon ---
const lifeSection = document.querySelector(".section-life");
const ship = document.querySelector(".ship-image");

function animateShip() {
  const rect = lifeSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // hvor mye av seksjonen er synlig (0 = start, 1 = slutt)
  const progress = Math.min(
    Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
    1
  );

  // gjør skipet synlig når det begynner å komme inn
  if (progress > 0.05 && progress < 0.95) {
    ship.style.opacity = 1;
  } else {
    ship.style.opacity = 0;
  }

  // flytt skipet fra venstre -> midt -> høyre
  const translateX = -150 + progress * 300; // starter utenfor venstre, ender utenfor høyre
  ship.style.transform = `translateX(${translateX}%)`;
}

window.addEventListener("scroll", animateShip);
animateShip();

// viser teksten når skipet nærmer seg midten
function showLifeText() {
  const rect = lifeSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.6 && rect.bottom > 0) {
    lifeSection.classList.add("visible");
  }
}
window.addEventListener("scroll", showLifeText);
showLifeText();

// --- CREW seksjon animasjon ---
const crewSection = document.querySelector(".section-crew");

function checkCrewVisibility() {
  const rect = crewSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
    crewSection.classList.add("visible");
  }
}

window.addEventListener("scroll", checkCrewVisibility);
checkCrewVisibility();

// --- MANUELT SLIDESHOW ---
let slideIndex = 1;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

function showSlides(n) {
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  slides.forEach((slide) => (slide.style.display = "none"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

// Neste / forrige kontroll
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Direkte navigering via prikker
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Event Listeners
prevBtn.addEventListener("click", () => plusSlides(-1));
nextBtn.addEventListener("click", () => plusSlides(1));
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => currentSlide(i + 1));
});

// Init
showSlides(slideIndex);

// --- EXTRACTION-SEKSJON ---
const extractionSection = document.querySelector(".section-extraction");

function checkExtractionVisibility() {
  const rect = extractionSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
    extractionSection.classList.add("visible");
  }
}

window.addEventListener("scroll", checkExtractionVisibility);
checkExtractionVisibility();

// --- Depth Section (måleboks + tekst) ---

document.addEventListener("DOMContentLoaded", () => {
  // --- Depth Section (måleboks + tekst) ---
  const depthSection = document.querySelector(".section-depth");

  if (depthSection) {
    function checkDepthVisibility() {
      const rect = depthSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Sjekker om seksjonen er minst 30% inne i viewport
      if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.2) {
        depthSection.classList.add("visible");
      } else {
        depthSection.classList.remove("visible"); // valgfritt, fjerner når du scroller ut
      }
    }

    // Lytter til scroll og kjører første gang
    window.addEventListener("scroll", checkDepthVisibility);
    checkDepthVisibility();
  }
});

// --- PRECISION SEKSJON (scroll-stopp + ett punkt av gangen) ---
document.addEventListener("DOMContentLoaded", () => {
  const precisionSection = document.querySelector(".section-precision");
  const precisionItems = document.querySelectorAll(".precision-list li");
  const precisionQuote = document.querySelector(".precision-quote");

  if (!precisionSection || precisionItems.length === 0) return;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const sectionTop = precisionSection.offsetTop;
    const sectionHeight = precisionSection.offsetHeight;

    // Sjekk om vi er inne i seksjonen
    if (y < sectionTop || y > sectionTop + sectionHeight) return;

    // Hvor langt du har scrollet i seksjonen (0 → 1)
    const progress = Math.min(
      1,
      Math.max(0, (y - sectionTop) / (sectionHeight - vh))
    );

    // Beregn hvilket punkt som skal vises
    const totalSteps = precisionItems.length + 1; // + sitatet
    const activeIndex = Math.floor(progress * totalSteps * 1.5);

    // Vis punktene gradvis
    precisionItems.forEach((item, idx) => {
      if (idx <= activeIndex - 1) {
        item.classList.add("visible");
      } else {
        item.classList.remove("visible");
      }
    });

    // Vis sitatet til slutt
    if (activeIndex >= totalSteps - 1) {
      precisionQuote.classList.add("visible");
    } else {
      precisionQuote.classList.remove("visible");
    }
  });
});

// --- Cooperation seksjon (fader inn og endrer lysstyrke med scroll) ---
const coopSection = document.querySelector(".section-cooperation");
const coopImage = document.querySelector(".coop-image");

window.addEventListener("scroll", () => {
  if (!coopSection || !coopImage) return;

  const rect = coopSection.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const sectionCenter = rect.top + rect.height / 2;
  const screenCenter = windowHeight / 2;
  const distance = Math.abs(sectionCenter - screenCenter);
  const maxDistance = windowHeight * 0.8;

  let brightness = 1.2 - distance / maxDistance;
  brightness = Math.max(0.4, Math.min(1.2, brightness));

  coopImage.style.filter = `brightness(${brightness}) drop-shadow(0 0 35px rgba(100, 170, 255, 0.7))`;

  // gjør at fade-in skjer når den er på skjermen
  const inView = rect.top < windowHeight * 0.8 && rect.bottom > 0;
  coopSection.classList.toggle("visible", inView);
});

// --- SAFETY seksjon: bilde glir inn fra høyre ---
const safetySection = document.querySelector(".section-safety");

if (safetySection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          safetySection.classList.add("visible");
        } else {
          safetySection.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.4, // hvor mye av seksjonen må være synlig før animasjonen skjer
    }
  );

  observer.observe(safetySection);
}
