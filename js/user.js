const user = JSON.parse(localStorage.getItem("user")) || [];
document.querySelector(".x").innerHTML = user;
if (user == "Anisse") {
  document
    .querySelector(".ximg")
    .setAttribute("src", "../images/IMG_9701.jpeg");
  document.querySelector(".p").innerHTML = "<span>A</span> You are Anisse";
} else if (user == "Recruiters") {
  document.querySelector(".ximg").setAttribute("src", "../images/reunion.jpeg");
}

// Variables globales
let compteur = 0; // Compteur qui permet de connaître l'image sur laquelle on se trouve
let timer, elements, slides, slideWidth, speed, transition;

window.onload = () => {
  // On récupère le diaporama
  const diapo = document.querySelector(".diapo");
  const diapowidth = document.querySelector(".elementsSection");
  // On récupère le data-speed
  speed = diapo.dataset.speed;
  transition = diapo.dataset.transition;

  elements = document.querySelector(".elementsSection");

  // On clone la 1ère image
  let firstImage = elements.firstElementChild.cloneNode(true);

  // On injecte le clone à la fin du diapo
  elements.appendChild(firstImage);

  slides = Array.from(elements.children);

  // On récupère la largeur d'une slide
  slideWidth = diapowidth.getBoundingClientRect().width;

  // On récupère les flèches
  let next = document.querySelector("#nav-droite");
  let prev = document.querySelector("#nav-gauche");

  // On gère le clic
  next.addEventListener("click", slideNext);
  elements.addEventListener("keyup", slideNext);
  prev.addEventListener("click", slidePrev);
  elements.addEventListener("keydown", slidePrev);

  // On automatise le défilement
  timer = setInterval(slideNext, speed);

  // On gère l'arrêt et la reprise
  diapo.addEventListener("mouseover", stopTimer);
  diapo.addEventListener("mouseout", startTimer);
};

//  Cette fonction fait défiler le diaporama vers la droite
function slideNext() {
  // On incrémente le compteur
  compteur++;
  elements.style.transition = transition + "ms linear";

  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;

  // On attend la fin de la transition et on "rembobine" de façon cachée
  setTimeout(function () {
    if (compteur >= slides.length - 1) {
      compteur = 0;
      elements.style.transition = "unset";
      elements.style.transform = "translateX(0)";
    }
  }, transition);
}

/**
 * Cette fonction fait défiler le diaporama vers la gauche
 */
function slidePrev() {
  // On décrémente le compteur
  compteur--;
  elements.style.transition = transition + "ms linear";

  if (compteur < 0) {
    compteur = slides.length - 1;
    let decal = -slideWidth * compteur;
    elements.style.transition = "unset";
    elements.style.transform = `translateX(${decal}px)`;
    setTimeout(slidePrev, 1);
  }

  let decal = -slideWidth * compteur;
  elements.style.transform = `translateX(${decal}px)`;
}

function stopTimer() {
  clearInterval(timer);
}

function startTimer() {
  timer = setInterval(slideNext, speed);
}
