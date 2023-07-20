//          -- CLASES --

class Producto {
  constructor(nombre, precio, rutaImg) {
    this.nombre = nombre;
    this.precio = precio;
    this.rutaImg = rutaImg;
  }
}

class Cliente {
  constructor() {
    this.carrito = [];
    this.total = 0;
  }

  anadirProducto(prod) {
    this.carrito.push(prod);
    this.total += prod.precio;
    alert("Agregaste al carrito " + prod.nombre + ".");
  }

  quitarProducto() {
    let carritoTabla = formatearProductos(this.carrito);

    let pos = parseInt(
      prompt(
        "Ingresá el número del producto que quieras eliminar:\n\n" +
          carritoTabla.join("") +
          "\nTotal: $" +
          this.total
      ) - 1
    );

    if (pos >= 0 && pos <= carritoTabla.length - 1) {
      this.total -= this.carrito[pos].precio;
      alert("Eliminaste " + this.carrito[pos].nombre);
      this.carrito.splice(pos, 1);
    } else {
      alert("El producto no existe.");
    }
  }

  verCarrito() {
    let carritoTabla = formatearProductos(this.carrito);
    alert("Productos:\n\n" + carritoTabla.join("") + "\nTotal: $" + this.total);
  }

  vaciarCarrito() {
    this.carrito = [];
    this.total = 0;
    alert("Se vació el carrito.");
  }
}

//
//

// FUNCIONES OPCIONAL

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

//          --- BLOQUE PRINCIPAL---

// Productos y Cliente

const tvSamsung = new Producto(
  'TV Samsung 50"',
  210000,
  "images/tv-samsung-50.png"
);
const notebookLenovo = new Producto(
  "Notebook Lenovo",
  260000,
  "images/notebook-lenovo.jpeg"
);
const zapaNike = new Producto(
  "Zapatillas Nike",
  65000,
  "images/zapa-nike.jpeg"
);
const remBlancaLisa = new Producto(
  "Remera blanca lisa",
  6000,
  "images/rem-blanca-lisa.webp"
);
const remNegraLisa = new Producto(
  "Remera negra lisa",
  5200,
  "images/rem-negra-lisa"
);
const botasMujer = new Producto(
  "Botas mujer 47 Street",
  22000,
  "images/botas-mujer"
);
const guitFender = new Producto(
  "Guitarra Eléctrica Fender",
  830000,
  "images/guit-fender.jpg"
);
const pianoDigital = new Producto(
  "Piano digital Yamaha P-45",
  357000,
  "images/piano-digital"
);
const bateriaParquer = new Producto(
  "Batería acústica Parquer",
  290000,
  "images/bateria-parquer"
);
const cocWhirlpool = new Producto(
  "Cocina Whirlpool",
  160000,
  "images/coc-whirlpool"
);

const hornoElec = new Producto(
  "Horno eléctrico Peabody",
  45000,
  "images/horno-elec"
);

const kitHerramientas = new Producto(
  "Kit de herramientas Kroner",
  28000,
  "images/kit-herramientas"
);

const stock = [
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

const cliente = new Cliente();

//

//          --- FUNCIONES ---

function mostrarMasProd(stock, prodMostrados, seccionProductos) {
  let nuevosProd = obtenerNuevosProd(stock, prodMostrados.length);

  prodMostrados = prodMostrados.concat(nuevosProd);
  cargarHTML(prodMostrados, seccionProductos);
  return prodMostrados;
}

function obtenerNuevosProd(stock, ultimoProd) {
  let productos = stock.slice(ultimoProd, ultimoProd + 4);

  return productos;
}

function cargarHTML(prodMostrados, seccionProductos) {
  for (let producto of prodMostrados) {
    let tarjetaProd = crearTarjeta(producto);
    seccionProductos.append(tarjetaProd);
  }
}

function crearTarjeta(producto) {
  let tarjetaProd = document.createElement("div");
  tarjetaProd.innerHTML = `<div class="card" style="width: 12rem;">
  <img src="${producto.rutaImg}" class="card-img-top" alt="${producto.nombre}">
  <div class="card-body">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">Completar descripción</p>
    <a href="#" class="btn btn-primary">Comprar</a>
  </div>
</div>`;
  return tarjetaProd;
}

let botonMostrarMasProd = document.getElementById("botonMasProd");

botonMostrarMasProd.onclick = () => {
  prodMostrados = mostrarMasProd(stock, prodMostrados, seccionProductos);
};
//          --- BLOQUE PRINCIPAL ---

// Inicializar Sección "Productos"

let prodMostrados = [];

let seccionProductos = document.querySelector(".productos");

prodMostrados = mostrarMasProd(stock, prodMostrados, seccionProductos);

console.log(prodMostrados);

/*

let control;
let idProd;
let producto;



control = parseInt(
  prompt(
    "¡Bienvenido! Elegí una opción: \n\n1 - Comprar un producto \n2 - Eliminar un producto \n3 - Ver Carrito \n4 - Vaciar Carrito \n5 - Pagar \n6 - Salir"
  )
);




switch (control) {
  case 1: {
    idProd = comprobarProducto(productos) - 1;
    if (idProd != -1) {
      producto = productos[idProd];
      cliente.anadirProducto(producto);
    }
    break;
  }
  case 2: {
    if (cliente.carrito.length != 0) {
      cliente.quitarProducto();
    } else {
      alert("El carrito está vacío.");
    }
    break;
  }
  case 3: {
    if (cliente.carrito.length != 0) {
      cliente.verCarrito();
    } else {
      alert("El carrito está vacío.");
    }

    break;
  }
  case 4: {
    cliente.vaciarCarrito();
    break;
  }
  case 5: {
    break;
  }
  case 6: {
    control = 0;
    break;
  }
}

*/
