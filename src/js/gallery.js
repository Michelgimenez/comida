// 1) Aca es donde sucede todo lo interesante. Esta class es llamado debajo de todo 2 veces y recibe los elementos html de los contenedores de las imagenes de la naturaleza y de la de las ciudades.
class Gallery {
  // 1) Lo primero que tengo es el constructor que establece los fields que va a tener la class, y en este caso recibe el elemento html que envie tras ser llamada la class.
  constructor(element) {
    // 1) Procedo a almacenar en el field que creo de container, el contenedor de las imagenes. Despues creo otro field llamado list donde uso querySelectorAll sobre el contenedor de imagenes para seleccionar todas las imagenes que tienen de class ".img", esto me da un array del tipo nodeList ya que es un array de elementos html, asi que para pasarlo a un array real simplemente uso el spread operator para extraer los elementos del array y esto lo encierro en [] para almacenar cada elemento en un nuevo array, creando asi un array real con estos elementos dentro.
    this.container = element;
    this.list = [...element.querySelectorAll(".gallery__img")];

    // 2) Procedo a obtener todos los diferentes elementos html que tengo dentro del modal que esta en el html desde que inicie la app.
    this.modal = document.querySelector(".modal");
    this.modalImg = document.querySelector(".main-img");
    this.imageName = document.querySelector(".image-name");
    this.modalImages = document.querySelector(".modal-images");
    this.closeBtn = document.querySelector(".close-btn");
    this.nextBtn = document.querySelector(".nex-btn");
    this.prevBtn = document.querySelector(".pre-btn");

    // 3) Procedo a crear diferentes fields que dentro van a contener los metodos que cree fuera del constructor y que muestran el modal, cambian a la siguiente/anterior imagen o el que selecciona la imagen y, les paso el THIS con BIND para que cada vez que llame a alguno de esos metodos, THIS represente este objeto que tiene todos estos fields que cree, de esa forma evito que THIS representa por ejemplo cuando le hago click al boton de siguiente imagen, el metodo de siguiente imagen es llamado por el eventListener que esta colocado sobre el boton de siguient imagen, por lo tanto THIS va a representar ese boton, asi que con esto evito ese bug.
    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);

    // 4) Aca selecciono el field del contenedor que contiene el elemento html que contiene todas las imagenes y le agrego el eventListener para cuando le haga click al contenedor.
    this.container.addEventListener(
      "click",
      function (e) {
        // 1) Si el elemento al que le hice click contiene la class de IMG, entonces procedo a llamar a THIS que representa el objeto creado por la class, y llamo al metodo que cree de openModal y le paso por un lado E.TARGET que representa el elemento html de la imagen en la que hice click, y por otro lado le paso el field de list que contiene el array de imagenes. A esta funcion le aplico BIND para que cuando use THIS, este no represente el elemento del contenedor de las imagenes ya que es el que ocasiona el llamado a la funcion, si no que represente el objeto de la class que tiene acceso a los fields y los metodos como openModal.
        if (e.target.classList.contains("gallery__img")) {
          this.openModal(e.target, this.list);
        }
      }.bind(this)
    );
  }

  // 2) Este es el metodo de openModal que recibe por un lado el elemento html de la imagen a la que le hice click y por otro lado recibe la lista de imagenes.
  openModal(selectedImage, list) {
    // 1) Lo primero que hago es llamar al metodo de setMainImage que coloca como imagen principal, la imagen recibida en este metodo.
    this.setMainImage(selectedImage);

    // 2) Selecciono el field de modalImages que es el div donde van a ir las imagenes del contenedor al que le hice click. y le coloco como html interno, el valor de loopear sobre LIST que es el array de imagenes que recibi en el metodo. Por cada imagen encontrada doy como retorno un elemento html que va a tener el src de la imgen, el titulo, el dataset y la class de forma dinamica. En caso de encontrarme la imagen que le hice click, en este loopeo, entonces le coloco la class de SELECTED. Esto da como retorno un nuevo array con todos estos elementos html, pero yo no quiero un array, asi que uso simplemente JOIN para unir todo en una unica string, asi que esa string es la que inyecto dentro del html interno de modalImages.
    this.modalImages.innerHTML = list
      .map(function (image) {
        return `<img src="${
          image.src
        }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.dataset.id === image.dataset.id ? "modal-img selected" : "modal-img"}"/>`;
      })
      .join("");

    // 3) Procedo a agregarle la class de open al modal para que se vea
    this.modal.classList.add("open");

    // 4) Selecciono los fields que contienen los elementos mas importantes del modal y les agrego eventListeners para llamar a los diferentes fields que contienen dentro los diferentes metodos para cerrar el modal, mostrar la siguiente imagen, etc. No uso BIND en este caso ya que si recuerdo bien ya use BIND anteriormente al almacenar los metodos en los fields de closeModal, nextImage, etc.
    this.closeBtn.addEventListener("click", this.closeModal);
    this.modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal-content")) {
        this.closeModal();
      }
    });
    this.nextBtn.addEventListener("click", this.nextImage);
    this.prevBtn.addEventListener("click", this.prevImage);
    this.modalImages.addEventListener("click", this.chooseImage);
  }

  // 3) Este metodo recibe la imagen a la cual le hice click y la coloca como la principal en el modal.
  setMainImage(selectedImage) {
    // 1) Selecciono el SRC de la imagen seleccionada y lo coloco como el src de la imagen principal del modal.
    this.modalImg.src = selectedImage.src;
  }

  // 4) Este metodo cierra el modal
  closeModal() {
    // 1) Lo primero es seleccionar el field que contiene el modal, y le saco la class de OPEN
    this.modal.classList.remove("open");

    // 2) Procedo a quitar los eventListener de cada elemento importante del modal.
    this.closeBtn.removeEventListener("click", this.closeModal);
    this.nextBtn.removeEventListener("click", this.nextImage);
    this.prevBtn.removeEventListener("click", this.prevImage);
    this.modalImages.removeEventListener("click", this.chooseImage);
  }

  // 5) Este metodo es el que muestra la siguiente imagen que tengo al lado de la que selecciona o la primera imagen en caso de no haber una siguiente imagen al lado.
  nextImage() {
    // 1) Lo primero es seleccionar del div de imagenes, la imagen cuya class tenga SELECTED.
    const selected = this.modalImages.querySelector(".selected");

    // 2) Almaceno en esta variable la imagen que le sigue a la seleccionada en caso de haberla (nextElementSibling), caso contrario que no haya nada, selecciono la primer imagen del div(firstElementChild)
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;

    // 3) Procedo a quitarle la class de selected a la imagen que antes estaba seleccionada
    selected.classList.remove("selected");

    // 4) Procedo a darle la class de selected a la siguiente imagen
    next.classList.add("selected");

    // Llamo al field que contiene el metodo de setMainImage y le paso el elemento html de la imagen que voy a colocar como principal en el modal.
    this.setMainImage(next);
  }

  // 6) Este metodo repite el proceso que el de arriba, no es necesario repetir la explicacion. En este caso si no hay imagen anterior, selecciona la ultima imagen en el div de imagenes.
  prevImage() {
    const selected = this.modalImages.querySelector(".selected");
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setMainImage(prev);
  }

  // 7) Este metodo es llamado cuando se hace click al contenedor de imagenes del modal.
  chooseImage(e) {
    // 1) Uso IF para verificar que a lo que le hice click tiene class de modal-img.
    if (e.target.classList.contains("modal-img")) {
      // 1) procedo a seleccionar la imagen que antes estaba seleccionada, y le quito la class de selected.
      const selected = this.modalImages.querySelector(".selected");
      selected.classList.remove("selected");

      // 2) Llamo al metodo de setMainImage que cambia la imagen principal del modal y el titulo de la imagen y le paso el elemento html de la imagen a la que le hice lick
      this.setMainImage(e.target);

      // 3) A la imagen que le hice click le procedo a agregar la class de selected.
      e.target.classList.add("selected");
    }
  }
}

// INICIO LA FUNCIONALIDAD DE LA GALERIA
// 1) Aca es donde creo dos variables que contiene el resultado de llamar a la class de gallery donde les paso el resultado de llamar a getElement() que justamente da como retorno el elemento html que contiene por un lado las imagenes de ciudades y por el otro el de la naturaleza. No es necesario almacenarlo en variables.
/*
  const nature = new Gallery(getElement(".nature"));
  const city = new Gallery(getElement(".city"));
  */

new Gallery(document.querySelector(".gallery"));

document.querySelector(".modal").addEventListener("click", (e) => {
  console.log(e.target);
});
