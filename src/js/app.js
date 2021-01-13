// 1) Selecciono los diferentes elementos importantes del slider, entre ellos los slides y los dos botones
const slides = document.querySelectorAll(".testimonies__slider-slide");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

// 2) Por cada slide en el array, procedo a usar forEach y tengo acceso a cada slide del array y el index que comienza en 0. Y le doy a cada slide un left del index multiplicado por 100%, el primer tiene left 0, el segundo 1 * 100 = 100, el tercero 200 y asi tengo una imagen al lado de la otra.
slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

// 3) Creo un contador comenzando en 0
let counter = 0;

// 4) Aca tengo los dos botones a los cuales los escucho cuando haga click, en caso de hacer click al de siguiente sumo el contador, llamo al metodo que muestra la siguiente imagen y llamo a dos metodos que cree yo que son para reiniciar el intervalo de 4 segundos de los slides, y para reiniciarlo nuevamente. En el caso de la imagen anterior, le resto al contador.
nextBtn.addEventListener("click", function () {
  counter++;
  carousel();
});

prevBtn.addEventListener("click", function () {
  counter--;
  carousel();
});

// 5) Este es el metodo que se llama cuando hago click a algun boton o cuando pasan 4 segundos con el intervalo. Esta es la funcionalidad del slider.
function carousel() {
  // 1) Primero tengo un IF que verifica que si el contador es menor a la longitud de slides - 1,(4) eso quiere decir que no me encuentro en la ultima imagen y por lo tanto muestro el boton de siguiente. Caso contrario quere decir que me encuentro en la ultima imagen y por lo tanto oculto el ultimo boton.
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }

  // 2) Este if va enfocado en el boton de anterior, en este caso procedo a verificar que si el contador es mayor a 0, es decir estoy en una imagen pasando la primera, entonces muestro el boton de anterior, caso contrario lo oculto.
  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }

  // 3) Por cada slide encontrado en el array, procedo a darle transformX para moverlo hacia la izquierda o derecha dependiendo del boton que toque. Ya que procedo a seleccionar cada slide y le agrego un transform X en base al valor de la variable de counter, entonces al tocar el boton de siguiente counter sube, por lo tanto por ejemplo si hago click a la siguiente imagen, counter pasa a ser de 0 a 1, 1 * 100 = 100, entonces todas las imagenes se mueven -100% hacia la izquierda, si hago click de nuevo, se mueven -200% hacia la izquierda y asi hasta llegar a -400%. Despues cada vez que voy bajando se van restando 100%, hasta que llego a la segunda imagen donde todas estan movidas -100% y donde counter pasa a valer 0 al hacer click al boton, por lo tanto 0 x 0 = 0, entonces todas las imagenes se mueven 0% y vuelven a su posicion inicial una al lado de la otra.
  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

// 6) Al iniciar el slider oculto por default el boton izquierdo
prevBtn.style.display = "none";
