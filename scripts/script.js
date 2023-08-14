/* 

Notas

La página cuenta con un stock de productos (array "stock") que se inicializa la primera vez que entramos y se guarda en Local Storage. A partir de ese momento el 
stock en LS funcionará como una "base de datos" única con la que podemos interactuar con dos usuarios diferentes. Intenté ponerlo en otro archivo e importarlo de
varias formas pero siempre tenía algún error.


Es obligatorio estar logueado para poder agregar productos al carrito y contamos con dos usuarios (array "usuarios") para hacer pruebas: 
usuario: "sergio" contraseña "123"  
usuario: "juan" contraseña: "456"

Cada uno tiene su propio carrito e interactúa con el stock modificando los productos disponibles. El carrito NO se vacía al cerrar sesión, para simular
la disponibilidad de productos en caso de que ambos usuarios estuvieran conectados al mismo tiempo. Se puede vaciar manualmente con el botón correspondiente. 
Para probar la falta de stock, el primer producto (TV Samsung) tiene sólo 4 unidades.




*** FALTA IMPLEMENTAR ***
- Finalizar la compra.



*/

//
//
//
//
//                             -- CLASES --

class Producto {
  constructor(nombre, precio, cant, rutaImg) {
    this.nombre = nombre;
    this.precio = precio;
    this.cant = cant;
    this.rutaImg = rutaImg;
    this.precioFormat = formatearPrecio(this.precio);
  }
}

//
//

class Cliente {
  constructor(nomUsuario) {
    this.nomUsuario = nomUsuario;
    this.carrito = [];
    this.total = 0;
  }

  //
  /*          Añadir producto */

  /* Verifica si hay stock del producto. Verifica si el producto ya está en el carrito. Si el producto no está en el carrito, 
  crea un nuevo objeto "producto" en base al del stock para agregarlo; si está en el carrito, lo actualiza. */

  anadirProducto(prodEnStock) {
    let seccionCarrito = document.getElementsByClassName("carrito")[0];

    let prodEnCarrito = buscarPorNombre(prodEnStock.nombre, this.carrito);

    if (prodEnStock.cant) {
      if (!prodEnCarrito) {
        // A - CREAR OBJETO "PRODUCTO" PARA EL CARRITO
        let prodEnCarrito = JSON.parse(JSON.stringify(prodEnStock));
        prodEnCarrito.cant = 1;

        // Cargar HTML
        cargarFilaCarrito(prodEnCarrito, seccionCarrito);

        // Actualizar carrito y stock (array y storage)
        this.carrito.push(prodEnCarrito);
        this.total += prodEnCarrito.precio;
        prodEnStock.cant--;
        localStorage.setItem(
          `${cliente.nomUsuario}-carrito`,
          JSON.stringify(this.carrito)
        );
        localStorage.setItem("stock", JSON.stringify(stock));
        totalCompra.innerText = formatearPrecio(this.total);
      } else {
        // B - ACTUALIZAR EL OBJETO EN EL CARRITO
        let filaCarrito = document.getElementById(
          `${prodEnCarrito.nombre}Carrito`
        );
        modificarProdCarrito("aumentar", prodEnCarrito, filaCarrito);
      }
    } else {
      Toastify({
        text: "No hay más unidades de este producto en stock. ",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background:
            "linear-gradient(90deg, rgba(255,84,84,1) 0%, rgba(162,0,0,1) 100%)",
        },
        stopOnFocus: true,
        className: "fw-bold rounded-3",
      }).showToast();
    }
  }

  //
  /*          Recuperar carrito */

  /* Recupera el carrito de LS y lo carga en la página. Elimina los productos que hayan quedado con cantidad "0". */

  recuperarCarrito() {
    this.carrito =
      JSON.parse(localStorage.getItem(`${cliente.nomUsuario}-carrito`)) || [];

    let seccionCarrito = document.getElementsByClassName("carrito")[0];
    let carritoTemp = [...this.carrito];

    for (let prodEnCarrito of this.carrito) {
      if (prodEnCarrito.cant) {
        // Cargar HTML
        cargarFilaCarrito(prodEnCarrito, seccionCarrito);
      } else {
        carritoTemp.splice(carritoTemp.indexOf(prodEnCarrito), 1);
      }
    }

    this.carrito = [...carritoTemp];
    localStorage.setItem(
      `${cliente.nomUsuario}-carrito`,
      JSON.stringify(this.carrito)
    );

    this.total = this.carrito.reduce(
      (acum, prodEnCarrito) => acum + prodEnCarrito.precio * prodEnCarrito.cant,
      0
    );
    totalCompra.innerText = formatearPrecio(this.total);
  }

  //
  /*          Vaciar carrito */

  /* Vacía el carrito. Actualiza stock(array y storage), total, HTML y carrito(storage). */

  vaciarCarrito() {
    devolverAStock();

    this.carrito = [];
    this.total = 0;
    let seccionCarrito = document.getElementsByClassName("carrito")[0];
    seccionCarrito.innerHTML = "";
    localStorage.setItem(`${cliente.nomUsuario}-carrito`, JSON.stringify([]));
    totalCompra.innerText = "$0.000";
  }
}

//
//
//
//
//                             -- FUNCIONES --

//
/*          Cargar usuarios */

/* Carga los usuarios de la "base de datos" (archivo JSON) */

async function cargarUsuarios() {
  let usuariosDB = await fetch("usuarios.json");
  usuariosDBJSON = await usuariosDB.json();
  usuarios = usuariosDBJSON;
}

//
/*          Cargar stock */

/* Busca el stock(storage). En caso de que no exista, se carga desde la "base de datos" (archivo JSON) y se guarda en storage; si existe, se recupera.
Se cargan los productos para mostrar en la página. */

async function cargarStock() {
  let stockActual = localStorage.getItem("stock");

  if (!stockActual) {
    let stockDB = await fetch("stock.json");

    stockDBJSON = await stockDB.json();
    stock = stockDBJSON;
    localStorage.setItem("stock", JSON.stringify(stock));
  } else {
    stock = JSON.parse(stockActual);
  }

  prodMostrados = mostrarMasProd(prodMostrados, seccionProductos);
}

//
/*         Mostrar más productos */

/* Crea y carga una fila para el producto en el carrito, compuesta por una variación de la tarjeta del producto, la cantidad de 
ese producto en el carrito y los botones para aumentar y disminuir y el total para ese producto.  */

function mostrarMasProd(prodMostrados, seccionProductos) {
  if (prodMostrados.length < stock.length) {
    let nuevosProd = obtenerNuevosProd(prodMostrados.length);

    prodMostrados = prodMostrados.concat(nuevosProd);
    cargarHTMLSeccionProd(nuevosProd, seccionProductos);
    mostrarCantProductos(prodMostrados, seccionProductos);

    return prodMostrados;
  }
}

//
/*          Obtener nuevos productos */

/* Toma 4 productos del stock desde el último mostrado. */

function obtenerNuevosProd(ultimoProd) {
  let productos = stock.slice(ultimoProd, ultimoProd + 4);

  return productos;
}

//
/*          Cargar HTML sección "productos" */

/* Crea una fila con las tarjetas de los productos tomados del stock y la carga en la página. Añade los eventos al botón de compra. */

function cargarHTMLSeccionProd(nuevosProd, seccionProductos) {
  let fila = document.createElement("div");
  fila.className = "d-flex justify-content-around my-4";

  for (let producto of nuevosProd) {
    let tarjetaProd = crearTarjeta(producto, "stock");
    let botonCompra = tarjetaProd.childNodes[3].childNodes[5];

    botonCompra.onclick = () => {
      if (logueado) {
        cliente.anadirProducto(producto);
      } else {
        Toastify({
          text: "¡Tenés que loguearte para poder agregar artículos a tu carrito! ",
          duration: 4000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          className: "fw-bold rounded-3",
        }).showToast();
      }
    };
    fila.appendChild(tarjetaProd);
  }

  seccionProductos.appendChild(fila);
}

//
/*          Mostrar cantidad de productos. */

/* Carga al final de los productos la cantidad de mostrados y la cantidad en stock. */

function mostrarCantProductos(prodMostrados, seccionProductos) {
  let mensajeViejo;
  if ((mensajeViejo = document.getElementById("mostrando"))) {
    mensajeViejo.remove();
  }
  let mensaje = document.createElement("p");
  mensaje.id = "mostrando";
  mensaje.className = "fs-4 my-3";
  mensaje.innerText = `Mostrando ${prodMostrados.length} de ${stock.length} productos.`;
  seccionProductos.appendChild(mensaje);
}

//
/*          Crear tarjeta */

/* Crea la tarjeta para el producto según sea para el stock o para el carrito. */

function crearTarjeta(producto, tipo) {
  let tarjetaProd = document.createElement("div");
  tarjetaProd.className = "card";

  if (tipo == "stock") {
    tarjetaProd.style = "width: 12rem;";
    tarjetaProd.innerHTML = `
  <img src="${producto.rutaImg}" class="card-img-top p-2" alt="${producto.nombre}">
  <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">${producto.precioFormat}</p>
    <a href="#" class="btn btn-primary">Comprar</a>
  </div>`;
  } else if (tipo == "carrito") {
    tarjetaProd.style = "width: 8rem;";
    tarjetaProd.className = "d-flex align-items-center";
    tarjetaProd.innerHTML = `
 <img src="${producto.rutaImg}" class="card-img-top me-3" alt="${producto.nombre}">
 <div class="card-body">
   <h5 class="card-title">${producto.nombre}</h5>
   <p class="card-text">${producto.precioFormat}</p>
 </div>`;
  }

  return tarjetaProd;
}

//
/*         Carga un producto del carrito en el HTML */

/* Crea y carga una fila para el producto en el carrito, compuesta por una variación de la tarjeta del producto, la cantidad de 
ese producto en el carrito y los botones para aumentar y disminuir y el total para ese producto.  */

function cargarFilaCarrito(prodEnCarrito, seccionCarrito) {
  // Crear fila para el producto y sus componentes
  let filaCarrito = document.createElement("div");
  filaCarrito.className =
    "d-flex justify-content-around align-items-center py-3 my-3 border border-2 rounded-2";
  filaCarrito.id = `${prodEnCarrito.nombre}Carrito`;

  //       1 - Tarjeta
  let tarjetaProd = crearTarjeta(prodEnCarrito, "carrito");

  //      2 - Cantidad de productos en el carrito y botones
  let cantYBotones = document.createElement("div");
  cantYBotones.className = "d-flex align-items-center";

  let botonDisminuir = document.createElement("button");
  botonDisminuir.type = "button";
  botonDisminuir.className = "btn btn-primary mx-2";
  botonDisminuir.innerHTML = '<i class="bi bi-chevron-down"></i>';
  botonDisminuir.onclick = () =>
    modificarProdCarrito("disminuir", prodEnCarrito, filaCarrito);

  let cantProd = document.createElement("span");
  cantProd.className = "px-2 py-1 border border-2";
  cantProd.innerText = `${prodEnCarrito.cant}`;

  let botonAumentar = document.createElement("button");
  botonAumentar.type = "button";
  botonAumentar.className = "btn btn-primary mx-2";
  botonAumentar.innerHTML = '<i class="bi bi-chevron-up"></i>';
  botonAumentar.onclick = () =>
    modificarProdCarrito("aumentar", prodEnCarrito, filaCarrito);

  //       3 - Total por producto
  let totalProducto = document.createElement("span");
  totalProducto.className = "fs-4";
  totalProducto.innerText = formatearPrecio(
    prodEnCarrito.precio * prodEnCarrito.cant
  );

  // Cargar en HTML
  seccionCarrito.appendChild(filaCarrito);

  filaCarrito.appendChild(tarjetaProd);

  cantYBotones.appendChild(botonDisminuir);
  cantYBotones.appendChild(cantProd);
  cantYBotones.appendChild(botonAumentar);
  filaCarrito.appendChild(cantYBotones);
  filaCarrito.appendChild(totalProducto);
}

//
/*          Modificar Productos en Carrito */

/* Busca el producto en el stock(array). Actualiza la cantidad según la operación solicitada y la disponibilidad de cada producto.
Actualiza HTML y stock(array y storage). */

function modificarProdCarrito(operacion, prodEnCarrito, filaCarrito) {
  let prodEnStock = buscarPorNombre(prodEnCarrito.nombre, stock);
  if (operacion == "disminuir") {
    if (prodEnCarrito.cant > 0) {
      prodEnCarrito.cant--;
      prodEnStock.cant++;
      cliente.total -= prodEnCarrito.precio;
      totalCompra.innerText = formatearPrecio(cliente.total);
    }
  } else if (operacion == "aumentar") {
    if (prodEnStock.cant > 0) {
      prodEnCarrito.cant++;
      prodEnStock.cant--;
      cliente.total += prodEnCarrito.precio;
      totalCompra.innerText = formatearPrecio(cliente.total);
    } else {
      Toastify({
        text: "No hay más unidades de este producto en stock. ",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
          background:
            "linear-gradient(90deg, rgba(255,84,84,1) 0%, rgba(162,0,0,1) 100%)",
        },
        stopOnFocus: true,
        className: "fw-bold rounded-3",
      }).showToast();
    }
  }

  filaCarrito.childNodes[1].childNodes[1].innerText = `${prodEnCarrito.cant}`;
  filaCarrito.childNodes[2].innerText = `${formatearPrecio(
    prodEnCarrito.precio * prodEnCarrito.cant
  )}`;
  localStorage.setItem(
    `${cliente.nomUsuario}-carrito`,
    JSON.stringify(cliente.carrito)
  );
  localStorage.setItem("stock", JSON.stringify(stock));
}

//
/*          Devolver a stock */

/* Devuelve los productos del carrito al stock(array) y actualiza el stock(storage). */

function devolverAStock() {
  for (let prodEnCarrito of cliente.carrito) {
    let prodEnStock = buscarPorNombre(prodEnCarrito.nombre, stock);
    prodEnStock.cant += prodEnCarrito.cant;
  }
  localStorage.setItem("stock", JSON.stringify(stock));
}

//
/*          Formatear precio */

/* Consulta por cada dígito si es distinto de 0 y si los dígitos de mayor orden también lo son. Puede formatear precios de 1.000 a 9.999.999. */

function formatearPrecio(precio) {
  let uM = Math.trunc((precio % 10000000) / 1000000);
  let cK = Math.trunc((precio % 1000000) / 100000);
  let dK = Math.trunc((precio % 100000) / 10000);
  let uK = Math.trunc((precio % 10000) / 1000);

  return `$${uM || ""}${uM ? "." + cK : cK || ""}${
    uM ? dK : cK ? dK : dK || ""
  }${uK}.${Math.trunc((precio % 1000) / 100)}${Math.trunc(
    (precio % 100) / 10
  )}${Math.trunc(precio % 10)}`;
}

//
/*          Buscar por nombre */

/* Busca un producto por su nombre en cualquier listado. */

function buscarPorNombre(nombre, listaProd) {
  let prodBuscado = listaProd.find((producto) => producto.nombre == nombre);
  return prodBuscado;
}

//
//
//
//
//                             -- EVENTOS --

let botonMostrarMasProd = document.getElementById("botonMasProd");
botonMostrarMasProd.onclick = () => {
  prodMostrados = mostrarMasProd(prodMostrados, seccionProductos);
};

let botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
botonVaciarCarrito.onclick = () => logueado && cliente.vaciarCarrito();

//
/*          Formulario para inicio de sesión */

/* Llama a la función "iniciarSesion". Si la combinación de nombre de usuario y contraseña son válidos, crea el objeto "cliente", cambia el estado a "logueado"
y recupera el carrito correspondiente. */

let formIniciarSesion = document.getElementById("formIniciarSesion");
formIniciarSesion.onsubmit = (e) => {
  e.preventDefault();
  let nomUsuario = iniciarSesion();
  if (nomUsuario) {
    logueado = 1;
    localStorage.setItem("logueado", 1);
    localStorage.setItem("nomUsuario", nomUsuario);
    cliente = new Cliente(nomUsuario);
    cliente.recuperarCarrito();

    crearBotonCerrarSesion();
  }
};

//
/*          Iniciar sesión */

/* Captura la entrada en el formulario de inicio de sesión. Consulta en la "base de datos" de usuarios por el nombre y la contraseña.
 Si existe, retorna el nombre de usuario para crear el objeto Cliente. Si no existe, hace visible el mensaje de aviso. */

function iniciarSesion() {
  let nomUsuario = document.getElementById("nomUsuario").value;
  let contrasena = document.getElementById("contrasena").value;

  if (usuarios.some((usu) => usu.nom == nomUsuario && usu.cont == contrasena)) {
    return nomUsuario;
  } else {
    Toastify({
      text: "Nombre de usuario o contraseña incorrectos. ",
      duration: 2000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background:
          "linear-gradient(90deg, rgba(255,84,84,1) 0%, rgba(162,0,0,1) 100%)",
      },
      stopOnFocus: true,
      className: "fw-bold rounded-3",
    }).showToast();

    return 0;
  }
}

//
/*          Crear botón para cerrar sesión */

/* Reemplaza el formulario de logueo con el botón para cerrar sesión y le añade su funcionalidad. */

function crearBotonCerrarSesion() {
  let seccionLogin = document.getElementsByClassName("login")[0];
  seccionLogin.innerHTML = `<p class="fs-4 me-4">¡Hola ${cliente.nomUsuario}! </p>
  <button type="button" class="btn btn-primary" id="botonCerrarSesion">Cerrar sesión</button>
  `;

  let botonCerrarSesion = document.getElementById("botonCerrarSesion");
  botonCerrarSesion.onclick = () => {
    localStorage.removeItem("nomUsuario");
    localStorage.removeItem("logueado");
    window.location.reload();
  };
}

//
//
//
//                             --- INICIALIZACIÓN ---

/* Se inicializan las variables principales y se cargan el stock y los usuarios de la "base de datos".
Se verifica si hay algún usuario logueado; de ser así, se creael objeto "cliente" y se recupera su carrito. */

let usuarios;
let stock;
let prodMostrados = [];
let seccionProductos = document.querySelector(".productos");
let totalCompra = document.getElementById("totalCompra");

cargarStock();
cargarUsuarios();

let logueado = localStorage.getItem("logueado");
let cliente;

if (logueado == "1") {
  let nomUsuario = localStorage.getItem("nomUsuario");
  cliente = new Cliente(nomUsuario);
  cliente.recuperarCarrito();

  crearBotonCerrarSesion();
}

//
//
//
//
//
// ------------------------------------------------------------------------------------------------------

//
/*          Buscar pokemon */

/* Genera un número aleatorio de 1 a 1009   */

function buscarPoke() {
  let pokeNum = Math.round(Math.random() * 1009 + 1);
  let pokeDiv = document.getElementsByClassName("pokeDiv")[0];
  let pokeFetch = fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
  let pokePromesa = new Promise((resolve, reject) => {
    resolve(pokeFetch);
  });
  let pokeJson = pokePromesa.then((result) => result.json());

  pokeJson.then((pokeData) => {
    pokeDiv.innerHTML = `<img style="width: 150px" src="${
      pokeData.sprites.front_default
    }"><p class="text-center">¡Felicitaciones! 
    Hoy te acompañará ${pokeData.name[0].toUpperCase()}${pokeData.name.slice(
      1
    )}.`;
  });
}

let botonBuscarPoke = document.getElementById("botonBuscarPoke");
botonBuscarPoke.onclick = () => buscarPoke();
