const nav = document.querySelector("nav");

// 1) Usando THE INTERSECTION OBSERVER API: En este caso selecciono el header, creo el observador con la callback y las opciones. Procedo a aplicarle el metodo de observe al observador para que observa al header. Voy a observar al header con un threshold de 0, es decir que quiero que se ejecute la callback cuando llego a la parte inferior final del header, basicamente cuando el final del header toca la parte superior de la pantalla. Al activarse la callback, recordar que esta recibe la entry que es un array, en este caso le envie un solo threshold asi que extraigo la unica entry del array con destructuring de arrays, que es lo mismo que haber hecho "const entry = entries[0]". Esta entry que recibo contiene un field llamado isIntersecting que al principio va a ser TRUE ya que el header se encuentra visible en la pantalla, pero al bajar y que el final del header toque la parte superior de la pantalla, esto pasa a FALSE, ya que el header desaparece de la pantalla. Entonces aprovecho eso para agregar la class de sticky a la nav al salir del header y la quito cuando vuelve a aparecer el header en la pantalla. Basicamente es como decir, si el elemento no es visible en la pantalla, agrega esta class, cuando vuelve a ser visible, quitarla. Y para que la nav aparezca antes de finalizar el header, agrego otra opcion llamada rootMargin, esto crea una especie de margen, si coloco un numero positivo, esto hace que el header termine mas abajo, si coloco un numero negativo, que el header termine mas arriba, en este caso le doy 90px que es el alto de la nav, de esa forma 90px antes de llegar al final del header, va a aparecer la nav. Y para que esos 90px sean dinamicos, por ejemplo en pantallas mas chicas la nav no a ser de 90px claramente, asi que uso el famoso metodo getBoundingClientRect que me da los detalles del elemento, en este caso la nav, y selecciono el field que tiene la altura y coloco esto en rootMargin con template string, teniendo como resultado -90px
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const observerCallbackStickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting === false) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(
  observerCallbackStickyNav,
  observerOptions
);

headerObserver.observe(header);
