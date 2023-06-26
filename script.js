// FUNCIONES

function seleccionarProducto() {
  return parseInt(
    prompt(
      'Ingrese el número del producto que desea comprar \n\n1 - TV Samsung 50" \n2 - Zapatillas Nike \n3 - Guitarra Eléctrica Fender \n4 - Cocina Whirlpool'
    )
  );
}

function comprobarProducto(id) {
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
  switch (id) {
    case 1:
      alert('¡Felicidades! Compraste una TV Samsung 50".');
      break;
    case 2:
      alert("¡Felicidades! Compraste unas Zapatillas Nike.");
      break;
    case 3:
      alert("¡Felicidades! Compraste una Guitarra Eléctrica Fender.");
      break;
    case 4:
      alert("¡Felicidades! Compraste una Cocina Whirlpool.");
      break;
  }
}

// Bloque Principal

let idProd = seleccionarProducto();
idProd = comprobarProducto(idProd);
mensajeCompra(idProd);
