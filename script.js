//        -- CLASES --

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
    let carritoNombres = this.formatearCarrito();

    let pos = parseInt(
      prompt(
        "Ingresá el número del producto que quieras eliminar:\n\n" +
          carritoNombres.join("") +
          "\nTotal: $" +
          this.total
      ) - 1
    );

    if (pos >= 0 && pos <= carritoNombres.length - 1) {
      this.total -= this.carrito[pos].precio;
      alert("Eliminaste " + carritoNombres[pos]);
      this.carrito.splice(pos, 1);
    } else {
      alert("El producto no existe.");
    }
  }

  formatearCarrito() {
    let i = 0;
    let carritoNombres = this.carrito.map((prod) => {
      i++;
      return `${i} - ${prod.nombre}\n`;
    });
    return carritoNombres;
  }

  verCarrito() {
    let carritoNombres = this.formatearCarrito();
    alert(
      "Productos:\n\n" + carritoNombres.join("") + "\nTotal: $" + this.total
    );
  }

  vaciarCarrito() {
    this.carrito = [];
    this.total = 0;
  }

  comprobarProducto() {
    let id = seleccionarProducto();

    while (id < 1 || id >= 5 || isNaN(id)) {
      if (id == 0) {
        break;
      }
      if (id != 0) {
        alert("El producto no existe.");
      }

      id = seleccionarProducto();
    }
    return id;
  }
}

//
//
//        -- FUNCIONES --

// PRODUCTO
function seleccionarProducto() {
  return parseInt(
    prompt(
      'Ingresá el número para seleccionar un producto: \n\n1 - TV Samsung 50" \n2 - Zapatillas Nike \n3 - Guitarra Eléctrica Fender \n4 - Cocina Whirlpool'
    )
  );
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

// Bloque Principal

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
      "¡Bienvenido! Elegí una opción: \n\n1 - Comprar un producto \n2 - Eliminar un producto \n3 - Ver Carrito \n4 - Pagar \n5 - Salir"
    )
  );

  switch (control) {
    case 1: {
      idProd = cliente.comprobarProducto() - 1;
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
      break;
    }
    case 5: {
      control = 0;
      break;
    }
  }
}
