//                             -- STOCK --

class Producto {
  constructor(nombre, precio, cant, rutaImg) {
    this.nombre = nombre;
    this.precio = precio;
    this.cant = cant;
    this.rutaImg = rutaImg;
    this.precioFormat = formatearPrecio(this.precio);
  }
}

const tvSamsung = new Producto(
  'TV Samsung 50"',
  207000,
  4,
  "images/tv-samsung-50.png"
);
const notebookLenovo = new Producto(
  "Notebook Lenovo",
  260000,
  999,
  "images/notebook-lenovo.jpeg"
);
const zapaNike = new Producto(
  "Zapatillas Nike",
  65000,
  999,
  "images/zapa-nike.jpeg"
);
const remBlancaLisa = new Producto(
  "Remera blanca lisa",
  6000,
  999,
  "images/rem-blanca-lisa.webp"
);

const remNegraLisa = new Producto(
  "Remera negra lisa",
  5200,
  999,
  "images/rem-negra-lisa"
);
const botasMujer = new Producto(
  "Botas mujer 47 Street",
  22000,
  999,
  "images/botas-mujer"
);
const guitFender = new Producto(
  "Guitarra Eléctrica Fender",
  830000,
  999,
  "images/guit-fender.jpg"
);
const pianoDigital = new Producto(
  "Piano digital Yamaha P-45",
  357000,
  999,
  "images/piano-digital"
);
const bateriaParquer = new Producto(
  "Batería acústica Parquer",
  290000,
  999,
  "images/bateria-parquer"
);

const cocWhirlpool = new Producto(
  "Cocina Whirlpool",
  160000,
  999,
  "images/coc-whirlpool"
);

const hornoElec = new Producto(
  "Horno eléctrico Peabody",
  45000,
  999,
  "images/horno-elec"
);

const kitHerramientas = new Producto(
  "Kit de herramientas Kroner",
  28000,
  999,
  "images/kit-herramientas"
);

let stock = [
  tvSamsung,
  notebookLenovo,
  zapaNike,
  remBlancaLisa,
  remNegraLisa,
  botasMujer,
  guitFender,
  pianoDigital,
  bateriaParquer,
  cocWhirlpool,
  hornoElec,
  kitHerramientas,
];

//                              -- CLIENTE --

class Cliente {
  constructor() {
    this.carrito = [];
    this.total = 0;
  }

  anadirProducto(prodEnStock) {
    let seccionCarrito = document.getElementsByClassName("carrito")[0];

    let prodEnCarrito = buscarPorNombre(prodEnStock.nombre, this.carrito);

    if (!prodEnCarrito) {
      // Crear objeto para el carrito e inicializar cantidad
      let prodEnCarrito = JSON.parse(JSON.stringify(prodEnStock));
      prodEnCarrito.cant = 1;

      // Crear fila para el producto

      let filaCarrito = document.createElement("div");
      filaCarrito.className =
        "d-flex justify-content-around align-items-center py-3 my-3 border border-2 rounded-2";
      filaCarrito.id = `${prodEnCarrito.nombre}Carrito`;

      // Tarjeta
      let tarjetaProd = crearTarjeta(prodEnCarrito, "carrito");

      // Cantidad de productos en el carrito y botones
      let cantYBotones = document.createElement("div");
      cantYBotones.className = "d-flex align-items-center";

      let botonDisminuir = document.createElement("button");
      botonDisminuir.type = "button";
      botonDisminuir.className = "btn btn-primary mx-2";
      botonDisminuir.innerHTML = '<i class="bi bi-chevron-down"></i>';
      botonDisminuir.onclick = () =>
        modificarProdCarrito("disminuir", prodEnCarrito, filaCarrito, this);

      let cantProd = document.createElement("span");
      cantProd.className = "px-2 py-1 border border-2";
      cantProd.innerText = `${prodEnCarrito.cant}`;

      let botonAumentar = document.createElement("button");
      botonAumentar.type = "button";
      botonAumentar.className = "btn btn-primary mx-2";
      botonAumentar.innerHTML = '<i class="bi bi-chevron-up"></i>';
      botonAumentar.onclick = () =>
        modificarProdCarrito("aumentar", prodEnCarrito, filaCarrito, this);

      // Total por producto

      let totalProducto = document.createElement("span");
      totalProducto.className = "fs-4";
      totalProducto.innerText = formatearPrecio(prodEnCarrito.precio);

      // INYECTAR EN HTML
      seccionCarrito.appendChild(filaCarrito);

      filaCarrito.appendChild(tarjetaProd);

      cantYBotones.appendChild(botonDisminuir);
      cantYBotones.appendChild(cantProd);
      cantYBotones.appendChild(botonAumentar);
      filaCarrito.appendChild(cantYBotones);
      filaCarrito.appendChild(totalProducto);

      // ACTUALIZAR CARRITO Y STOCK
      this.carrito.push(prodEnCarrito);
      this.total += prodEnCarrito.precio;
      prodEnStock.cant--;
      localStorage.setItem("carrito", JSON.stringify(this.carrito));
      localStorage.setItem("stock", JSON.stringify(stock));
    } else {
      let filaCarrito = document.getElementById(
        `${prodEnCarrito.nombre}Carrito`
      );
      modificarProdCarrito("aumentar", prodEnCarrito, filaCarrito, this);
    }
  }

  recuperarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarStock(stock, this, "recuperar carrito");

    let seccionCarrito = document.getElementsByClassName("carrito")[0];
    let carritoTemp = [...this.carrito];
    /* Se puede utilizar el operador "spread" ya que en este caso no es necesario 
    proteger los valores internos de los objetos. */

    for (let prodEnCarrito of this.carrito) {
      if (prodEnCarrito.cant) {
        // Crear fila para el producto

        let filaCarrito = document.createElement("div");
        filaCarrito.className =
          "d-flex justify-content-around align-items-center py-3 my-3 border border-2 rounded-2";
        filaCarrito.id = `${prodEnCarrito.nombre}Carrito`;

        // Tarjeta
        let tarjetaProd = crearTarjeta(prodEnCarrito, "carrito");

        // Cantidad de productos en el carrito y botones
        let cantYBotones = document.createElement("div");
        cantYBotones.className = "d-flex align-items-center";

        let botonDisminuir = document.createElement("button");
        botonDisminuir.type = "button";
        botonDisminuir.className = "btn btn-primary mx-2";
        botonDisminuir.innerHTML = '<i class="bi bi-chevron-down"></i>';
        botonDisminuir.onclick = () =>
          modificarProdCarrito("disminuir", prodEnCarrito, filaCarrito, this);

        let cantProd = document.createElement("span");
        cantProd.className = "px-2 py-1 border border-2";
        cantProd.innerText = `${prodEnCarrito.cant}`;

        let botonAumentar = document.createElement("button");
        botonAumentar.type = "button";
        botonAumentar.className = "btn btn-primary mx-2";
        botonAumentar.innerHTML = '<i class="bi bi-chevron-up"></i>';
        botonAumentar.onclick = () =>
          modificarProdCarrito("aumentar", prodEnCarrito, filaCarrito, this);

        // Total por producto

        let totalProducto = document.createElement("span");
        totalProducto.className = "fs-4";
        totalProducto.innerText = formatearPrecio(
          prodEnCarrito.precio * prodEnCarrito.cant
        );

        // INYECTAR EN HTML
        seccionCarrito.appendChild(filaCarrito);

        filaCarrito.appendChild(tarjetaProd);

        cantYBotones.appendChild(botonDisminuir);
        cantYBotones.appendChild(cantProd);
        cantYBotones.appendChild(botonAumentar);
        filaCarrito.appendChild(cantYBotones);
        filaCarrito.appendChild(totalProducto);
      } else {
        carritoTemp.splice(carritoTemp.indexOf(prodEnCarrito), 1);
      }
    }

    this.carrito = [...carritoTemp];
    localStorage.setItem("carrito", JSON.stringify(this.carrito));

    this.total = this.carrito.reduce(
      (acum, prodEnCarrito) => acum + prodEnCarrito.precio * prodEnCarrito.cant,
      0
    );
  }

  vaciarCarrito() {
    // Devuelve la cantidad de cada producto al stock
    actualizarStock(stock, this, "vaciar carrito");

    this.carrito = [];
    this.total = 0;
    let seccionCarrito = document.getElementsByClassName("carrito")[0];
    seccionCarrito.innerHTML = "";
    localStorage.setItem("carrito", JSON.stringify([]));
  }
}

//                             -- FUNCIONES --

function formatearPrecio(precio) {
  /* Consulta por cada dígito si es distinto de 0 y si los dígitos de mayor orden también lo son.
    Puede formatear precios de 1.000 a 9.999.999 */
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

function modificarProdCarrito(operacion, prodEnCarrito, filaCarrito, cliente) {
  let prodEnStock = buscarPorNombre(prodEnCarrito.nombre, stock);
  if (operacion == "disminuir") {
    if (prodEnCarrito.cant > 0) {
      prodEnCarrito.cant--;
      prodEnStock.cant++;
      cliente.total -= prodEnCarrito.precio;
    }
  } else if (operacion == "aumentar") {
    if (prodEnStock.cant > 0) {
      prodEnCarrito.cant++;
      prodEnStock.cant--;
      cliente.total += prodEnCarrito.precio;
    } else {
      alert("No hay más unidades de este producto en stock");
    }
  }

  filaCarrito.childNodes[1].childNodes[1].innerText = `${prodEnCarrito.cant}`;
  filaCarrito.childNodes[2].innerText = `${formatearPrecio(
    prodEnCarrito.precio * prodEnCarrito.cant
  )}`;
  localStorage.setItem("carrito", JSON.stringify(cliente.carrito));
  localStorage.setItem("stock", JSON.stringify(stock));
}

function mostrarMasProd(stock, prodMostrados, seccionProductos) {
  if (prodMostrados.length < stock.length) {
    let nuevosProd = obtenerNuevosProd(stock, prodMostrados.length);

    prodMostrados = prodMostrados.concat(nuevosProd);
    cargarHTMLSeccionProd(nuevosProd, seccionProductos);
    mostrarCantProductos(prodMostrados, stock, seccionProductos);

    return prodMostrados;
  }
}

function obtenerNuevosProd(stock, ultimoProd) {
  let productos = stock.slice(ultimoProd, ultimoProd + 4);

  return productos;
}

function cargarHTMLSeccionProd(nuevosProd, seccionProductos) {
  let fila = document.createElement("div");
  fila.className = "d-flex justify-content-around my-4";

  for (let producto of nuevosProd) {
    let tarjetaProd = crearTarjeta(producto, "stock");
    let botonCompra = tarjetaProd.childNodes[3].childNodes[5];
    botonCompra.onclick = () => {
      cliente.anadirProducto(producto);
    };
    fila.appendChild(tarjetaProd);
  }

  seccionProductos.appendChild(fila);
}

function crearTarjeta(producto, tipo) {
  let tarjetaProd = document.createElement("div");
  tarjetaProd.className = "card";

  if (tipo == "stock") {
    tarjetaProd.style = "width: 12rem;";
    tarjetaProd.innerHTML = `
  <img src="${producto.rutaImg}" class="card-img-top" alt="${producto.nombre}">
  <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">${producto.precioFormat}</p>
    <a href="#" class="btn btn-primary">Comprar</a>
  </div>`;
  } else if (tipo == "carrito") {
    tarjetaProd.style = "width: 10rem;";
    tarjetaProd.innerHTML = `
 <img src="${producto.rutaImg}" class="card-img-top" alt="${producto.nombre}">
 <div class="card-body">
   <h5 class="card-title">${producto.nombre}</h5>
   <p class="card-text">${producto.precioFormat}</p>
 </div>`;
  }

  return tarjetaProd;
}

function mostrarCantProductos(prodMostrados, stock, seccionProductos) {
  let mensajeViejo;
  if ((mensajeViejo = document.getElementById("mostrando"))) {
    mensajeViejo.remove();
  }
  let mensaje = document.createElement("p");
  mensaje.id = "mostrando";
  mensaje.innerText = `Mostrando ${prodMostrados.length} de ${stock.length} productos.`;
  seccionProductos.appendChild(mensaje);
}

function buscarPorNombre(nombre, listaProd) {
  let prodBuscado = listaProd.find((producto) => producto.nombre == nombre);
  return prodBuscado;
}

function actualizarStock(stock, cliente, operacion) {
  for (let prodEnCarrito of cliente.carrito) {
    let prodEnStock = buscarPorNombre(prodEnCarrito.nombre, stock);
    if (operacion == "vaciar carrito") {
      prodEnStock.cant += prodEnCarrito.cant;
    } else if (operacion == "recuperar carrito") {
      prodEnStock.cant -= prodEnCarrito.cant;
    }
  }
  localStorage.setItem("stock", JSON.stringify(stock));
}

function recuperarStock(stock) {
  let stockActual = localStorage.getItem("stock");
  if (!stockActual) {
    localStorage.setItem("stock", JSON.stringify(stock));
  } else {
    stock = JSON.parse(stockActual);
  }
  return stock;
}

//    Eventos

let botonMostrarMasProd = document.getElementById("botonMasProd");
botonMostrarMasProd.onclick = () => {
  prodMostrados = mostrarMasProd(stock, prodMostrados, seccionProductos);
};

let botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
botonVaciarCarrito.onclick = () => cliente.vaciarCarrito();

//
//

// FUNCIONES
// CUOTAS
/*
function seleccionarCuotas() {
  let cuotas = parseInt(prompt("Elegí el número de cuotas: 1, 3, 6 o 12"));
  return cuotas;
}

function comprobarCuotas(precio) {
  alert("El precio de tu producto es de $" + precio);

  let cuotas = seleccionarCuotas();

  while (cuotas != 1 && cuotas != 3 && cuotas != 6 && cuotas != 12) {
    alert("No ingresaste un número válido de cuotas");
    cuotas = seleccionarCuotas();
  }

  return cuotas;
}
*/
// TOTAL
/*
function calcularTotal(precio, cuotas) {
  switch (cuotas) {
    case 1:
      return precio;
    case 3:
      return precio * 1.2;
    case 6:
      return precio * 1.5;
    case 12:
      return precio * 1.8;
  }
}

function mensajeTotal(total, cuotas) {
  alert(
    "El total con intereses es de $" +
      total +
      " a pagar en " +
      cuotas +
      " cuota(s) de $" +
      total / cuotas +
      "."
  );
}
*/

//                             --- INICIALIZACIÓN ---

const cliente = new Cliente();
cliente.recuperarCarrito();
stock = recuperarStock(stock);

let prodMostrados = [];

let seccionProductos = document.querySelector(".productos");

prodMostrados = mostrarMasProd(stock, prodMostrados, seccionProductos);
