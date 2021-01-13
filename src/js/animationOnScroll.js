// SELECCION ELEMENTOS PARA APLICAR ANIMACIONES //
const aboutCards = document.querySelector(".about__details");
const iphoneImg = document.querySelector(".iphone-img");
const cities = document.querySelector(".cities__details");
const plans = document.querySelectorAll(".plans__details-card");
const form = document.querySelector(".contact__form");

// REVELANDO ELEMENTOS AL SCROLLEAR HACIA ABAJO (Nuevamente el observer API): En este caso procedo a almacenar en un variable la seleccion de todas las secciones que tienen la class de section. Aprovecho este array para usar forEach para colocarle a cada seccion que encuentro, el observador y para agregar manualmente la class que oculta todas las secciones. Despues lo mas importante es la funcion donde tras bajar un 15% desde que aparece la seccion en pantalla, esta se ejecuta y donde extraigo la unica entrada que recibo ya que hay un solo threshold, y procedo a decir que si isIntersecting es true, osea que llegue a ese 15% por debajo de la seccion, entonces  quito esa class de hidden de la seccion especifica en la que me encuentro, para realizar esto, extraigo de la entry, el field de target, este field tiene informacion sobre la seccion en la que me encuentro cumpliendo el 15% del threshold, y selecciono el field que me dice las class que tiene esta seccion y aplico remove para quitar de esas clases, la de hidden. Y para poder dejar de observar la seccion, una vez ya se le quito la class a ese elemento, utilizo el argumento que le es enviada a la funcion (observer) que contiene el observador, y le aplico el metodo para dejar de observar y le coloco dentro el elemento a dejar de observar.

// 1) CARDS
const revealSectionCallback = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting === true) {
    entry.target.classList.remove("hidden");
    observer.unobserve(entry.target);
  }
};

const revealSectionOptions = {
  root: null,
  threshold: 0.5,
};

const sectionObserver = new IntersectionObserver(
  revealSectionCallback,
  revealSectionOptions
);

sectionObserver.observe(aboutCards);
aboutCards.classList.add("hidden");

// 2) PHONE
const revealSectionCallback2 = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting === true) {
    entry.target.classList.remove("hidden");
    entry.target.classList.add("up");
    observer.unobserve(entry.target);
  }
};

const revealSectionOptions2 = {
  root: null,
  threshold: 0.5,
};

const sectionObserver2 = new IntersectionObserver(
  revealSectionCallback2,
  revealSectionOptions2
);

sectionObserver2.observe(iphoneImg);
iphoneImg.classList.add("hidden");

// CITIES
const revealSectionCallback3 = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting === true) {
    entry.target.classList.remove("hidden");
    observer.unobserve(entry.target);
  }
};

const revealSectionOptions3 = {
  root: null,
  threshold: 0.4,
};

const sectionObserver3 = new IntersectionObserver(
  revealSectionCallback3,
  revealSectionOptions3
);

sectionObserver3.observe(cities);
cities.classList.add("hidden");

// PLANS
const revealSectionCallback4 = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting === true) {
    entry.target.classList.add("scale");
    observer.unobserve(entry.target);
  }
};

const revealSectionOptions4 = {
  root: null,
  threshold: 0.95,
};

const sectionObserver4 = new IntersectionObserver(
  revealSectionCallback4,
  revealSectionOptions4
);

plans.forEach((plan) => {
  sectionObserver4.observe(plan);
});
