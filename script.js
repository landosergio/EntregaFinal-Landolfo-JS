//        -- FUNCIONES --

// PRODUCTO
function seleccionarProducto() {
  return parseInt(
    prompt(
      'Ingresá el número para seleccionar un producto: \n\n1 - TV Samsung 50" \n2 - Zapatillas Nike \n3 - Guitarra Eléctrica Fender \n4 - Cocina Whirlpool'
    )
  );
}

function comprobarProducto() {
  let id = seleccionarProducto();

  while (id < 1 || id >= 5 || isNaN(id)) {
    if (id == 0) {
      alert(
        "¿Estás seguro? Realmente te recomendamos comprar algo. Intentemos de nuevo"
      );
    }
    if (id != 0) {
      alert("El producto no existe");
    }

    id = seleccionarProducto();
  }
  return id;
}

function mensajeCompra(id) {
  let producto;
  let precio;
  switch (id) {
    case 1:
      producto = 'TV Samsung 50"';
      precio = 210000;
      break;
    case 2:
      producto = "Zapatillas Nike";
      precio = 65000;
      break;
    case 3:
      producto = "Guitarra Eléctrica Fender";
      precio = 830000;
      break;
    case 4:
      producto = "Cocina Whirlpool";
      precio = 160000;
      break;
  }
  alert("Seleccionaste " + producto);
  return precio;
}

// CUOTAS

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

// TOTAL

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

// Bloque Principal

let accion = 1;

while (accion != 0) {
  let idProd = comprobarProducto();

  let precio = mensajeCompra(idProd);

  let cuotas = comprobarCuotas(precio);

  let total = calcularTotal(precio, cuotas);

  mensajeTotal(total, cuotas);

  accion = parseInt(prompt("¿Querés seguir comprando? Ingresá '0' para salir"));
}
