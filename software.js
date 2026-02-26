// ===============================
// REFERENCIAS DEL DOM (Document Object Model)
// ===============================

// CREACION DE VARIABLES O INPUTS REQUERIDOS

// document.getElementById llama o trae lo que se alberga en ("caloriasMinimas") del html y se guarda en CaloriasMin
// LO MISMO APLICA PARA PesoMax.
const CaloriasMin = document.getElementById("caloriasMinimas");
const PesoMax = document.getElementById("pesoMaximo");

// VARIABLES QUE ALBERGAN LOS ELEMENTOS QUE SE DESEEN AGREGAR PARA ESCALAR EL RISCO
const Nombre = document.getElementById("nombreElemento");
const Peso = document.getElementById("pesoElemento");
const Calorias = document.getElementById("caloriasElemento");

// CREACION DE BOTONES PARA AGREGAR Y ELIMINAR LOS ELEMENTOS Y CALCULAR LA MEJOR COMBINACION DE LOS MISMOS
const Boton_Agregar = document.getElementById("btnAgregar");
const Boton_Calcular = document.getElementById("btnCalcular");
const Boton_Eliminar = document.getElementById("btnEliminar");
const inputEliminar = document.getElementById("nombreEliminar");

// VISUALIZACION QUE ME PERMITE VER LOS ELEMENTOS A MEDIDA QUE SE VAN AGREGANDO Y EL RESULTADO DE LA MEJOR COMBINACION
const listaElementos = document.getElementById("listaElementos");
const resultado = document.getElementById("resultado");


// ===============================
// ARREGLO DINÁMICO DE ELEMENTOS
// ===============================

//en la variable elementos se van guardando los elementos que el usuario vaya ingresando desde el html { nombre, peso, calorias }
let elementos = [];

// ===============================
// AGREGAR ELEMENTO
// ===============================

// Cuando el usuario haga click en el botón Agregar, ejecuta el siguiente bloque de código
Boton_Agregar.addEventListener("click", function () {

  const nombre = Nombre.value.trim(); // se trae el string que se guardo en Nombre y se eliminan espacios con trim()
  const peso = parseInt(Peso.value); // se trae el string que se guardo en Peso y se convierte a entero con parseInt
  const calorias = parseInt(Calorias.value); // se trae el string que se guardo en Calorias y se convierte a entero con parseInt

  // si el nombre esta vacio o el numero o las calorias esta vacia
  // !nombre = "" vacio, isNaN = is Not a Number
  if (!nombre && isNaN(peso) && isNaN(calorias)) {
    alert("Complete todos los campos correctamente.");
    return;
  }

  else if (nombre && isNaN(calorias) && isNaN(peso)) {
    resultado.textContent = "Ingrese valores válidos para calorías mínimas y peso máximo.";
    return;
  }

  else if (isNaN(calorias)) {
      resultado.textContent = "Ingrese un valor válido para calorías mínimas.";
      return;
  }

  else if (isNaN(peso)) {
      resultado.textContent = "Ingrese un valor válido para peso máximo.";
      return;
  }

  // despues de la condicion, se guardan los elementos en el objeto nuevoElemento
  const nuevoElemento = {nombre, peso, calorias};

  // luego se agrega "nuevoElemento" a la lista vacia "elementos" que se habia creado anteriormente por medio de push
  elementos.push(nuevoElemento);

  // se llama a la funcion
  mostrarElementos();

  // por ultimo se limpian las entradas (inputs)
  Nombre.value = "";
  Peso.value = "";
  Calorias.value = "";
});

// ===============================
// ELIMINAR UN ELEMENTO
// ===============================

Boton_Eliminar.addEventListener("click", function () {
  const nombre = inputEliminar.value.trim();

  if (!nombre) {
    alert("Ingrese el nombre del elemento a eliminar.");
    return;
  }

  // Filtramos elementos que no coincidan con el nombre, los convertimos a minuscula y evaluamos
  const elementosFiltrados = elementos.filter(
    (elemento) => elemento.nombre.toLowerCase() !== nombre.toLowerCase()
  );

  if (elementosFiltrados.length === elementos.length) {
    alert(`No se encontró un elemento llamado "${nombre}".`);
    return;
  }

  elementos = elementosFiltrados; // aqui se elimina el elemento escrito en el input de la lista "elementos"

  mostrarElementos();

  // Limpiar input
  inputEliminar.value = ""; // limpia el entry 
});


// ===============================
// MOSTRAR ELEMENTOS EN PANTALLA
// ===============================
function mostrarElementos() {

  // innerHTML es el contenido HTML que está dentro del elemento y lo borra para que no se repita
  // osea que innerHTML reemplaza o modifica todo el contenido del elemento
  listaElementos.innerHTML = ""; 

  // recorre los elementos que estan en la lista "elementos", desde el objeto actual y su indice que comienza desde cero
  elementos.forEach(function (elemento, index) {

    // createElement me crea un nuevo elemento HTML que aún no está en la página (li: lista de ítems)
    const item = document.createElement("li");

    // item.textContent agrega contenido al elemento 
    item.textContent =
      `${elemento.nombre} | Peso: ${elemento.peso} | Calorías: ${elemento.calorias}`;

    // y mostramos el elemento.
    // appendChild añade un elemento al final, sin borrar lo que ya estaba
    listaElementos.appendChild(item);
  });
}


// ===============================
// CALCULAR LA MEJOR COMBINACIÓN
// ===============================
// Cuando el usuario haga click en el botón "Calcular mejor combinacion", ejecuta el siguiente bloque de código

Boton_Calcular.addEventListener("click", function () {

  const calorias_Minimas = parseInt(CaloriasMin.value); // se trae el string que se guardo en CaloriasMin y se convierte a entero con parseInt
  const peso_Maximo = parseInt(PesoMax.value); // se trae el string que se guardo en PesoMax y se convierte a entero con parseInt

  // si el numero o las calorias minimas o el peso maximo esta vacio
  if (isNaN(calorias_Minimas) && isNaN(peso_Maximo)) {
    resultado.textContent = "Ingrese valores válidos para calorías mínimas y peso máximo.";
    return;
  }
  else if (isNaN(calorias_Minimas)) {
    resultado.textContent = "Ingrese valores válidos para calorías mínimas.";
    return;
  }
  else if (isNaN(peso_Maximo)) {
    resultado.textContent = "Ingrese valores válidos para peso máximo.";
    return;
  }

  // si la lista "elementos" esta vacia
  if (elementos.length === 0) {
    resultado.textContent = "Agregue al menos un elemento.";
    return;
  }

  // se crean 3 variables 
  let mejorCombinacion = []; // lista vacia que va a guardar los nombres de los elementos elegidos.
  let mejorPeso = Infinity; // Infinity me sirve para comparar pesos y asegurarme de que cualquier combinación real sea menor que esto (infinito)
  let mejorCalorias = 0; // Guarda las calorias de la mejor combinacin encontrada

  // esta funcion permite buscar la mejor combinacion en base a los parametros que le ingresamos
  function buscar(indice, pesoActual, caloriasActuales, combinacionActual) {

    if (pesoActual > peso_Maximo) {
      return;
    }

    // indice === elementos.length): cuando ya no hay más elementos para considerar que se evalue la siguiente condicion
    if (indice === elementos.length) {

      if (caloriasActuales >= calorias_Minimas) {

      //Si la combinación tiene el mismo peso que la mejor entonces se desempata usando las calorías:
      // Si tiene más calorías, es mejor, asi se busca la combinación más ligera con más energía
        if (
          pesoActual < mejorPeso ||
          (pesoActual === mejorPeso && caloriasActuales > mejorCalorias)
        ) {
          mejorPeso = pesoActual; // actualiza el peso de la mejor combinación
          mejorCalorias = caloriasActuales; // actualiza las calorías de la mejor combinación
          mejorCombinacion = combinacionActual.slice(); // guarda la combinación actual, slice crea una copia para posteriormente modificar mejor combinacion
        }
      }

      return;
    }

    // linea recursiva que me permite obtener todas las combinaciones posibles llamando la funcion buscar
    // en este caso, no toma el elemento desde donde esta evaluando (elementos)
    buscar(indice + 1, pesoActual, caloriasActuales, combinacionActual);

    // Aqui si se toma el elemento desde donde esta evaluando (elementos)
    const elemento = elementos[indice]; // guardamos en la variable elemento el indice de dicho elemento que esta en la lista "elementos"
    combinacionActual.push(elemento.nombre); // se agrega el elemento a combinacion actual por medio de push

    buscar(
      indice + 1,
      pesoActual + elemento.peso,
      caloriasActuales + elemento.calorias,
      combinacionActual
    );

    combinacionActual.pop(); // quita el elemento actual para probar combinaciones sin él en los pasos siguientes
  }

  // en esta parte del codigo tomamos los valores iniciales:
  // indice	0	Comenzamos en el primer elemento del arreglo elementos
  // pesoActual	0	Inicialmente no hemos sumado ningún peso
  // caloriasActuales	0	Inicialmente no hemos sumado ninguna caloría
  // combinacionActual	[]	La combinación actual empieza vacía porque aún no hemos tomado ningún elemento
  buscar(0, 0, 0, []);


  // Mostrar resultado
  if (mejorCombinacion.length > 0) {
    resultado.innerHTML = `
      Mejor combinación: ${mejorCombinacion.join(", ")} <br>
      Peso total: ${mejorPeso} <br>
      Calorías totales: ${mejorCalorias}
    `;
  } else {
    resultado.textContent = "No existe una combinación válida.";
  }

});