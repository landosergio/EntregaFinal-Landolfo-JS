//          -- CLASES --

class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
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

//          --- FUNCIONES ---

function mostrarProductos(productos) {
  let productosTabla = formatearProductos(productos);
  return parseInt(
    prompt(
      `Ingresá un número para seleccionar el producto o "0" para volver al menú principal: \n\n` +
        productosTabla.join("")
    )
  );
}

function formatearProductos(productos) {
  let i = 0;
  let productosTabla = productos.map((prod) => {
    i++;
    return `${i} - ${prod.nombre} ------------ $${prod.precio}\n`;
  });
  return productosTabla;
}

function comprobarProducto(productos) {
  let id = mostrarProductos(productos);

  while (id < 1 || id > productos.length || isNaN(id)) {
    if (id == 0) {
      break;
    }
    if (id != 0) {
      alert("El producto no existe.");
    }

    id = mostrarProductos(productos);
  }
  return id;
}

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

// Productos

const tvSamsung = new Producto('TV Samsung 50"', 210000);
const zapaNike = new Producto("Zapatillas Nike", 65000);
const guitFender = new Producto("Guitarra Eléctrica Fender", 830000);
const cocWhirlpool = new Producto("Cocina Whirlpool", 160000);

const productos = [tvSamsung, zapaNike, guitFender, cocWhirlpool];

const cliente = new Cliente();

let control = 1;
let idProd;
let producto;

while (control != 0) {
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
}
