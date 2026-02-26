Descripción del problema
Una serie de excursionistas desea desarrollar un software que permita determinar qué elementos deben llevar para escalar un risco de manera eficiente.
Cada elemento disponible posee dos propiedades fundamentales:
  -	Calorías
  -	Peso
Para realizar la escalada, se definen dos restricciones principales:
  -	Una cantidad mínima de calorías requerida
  -	Un peso máximo que se puede transportar
El objetivo del sistema es seleccionar el conjunto óptimo de elementos que cumpla con el mínimo calórico exigido y que, al mismo tiempo, tenga el menor peso posible.
*******************************************************
Objetivo del software
El sistema debe:
•	Permitir agregar y eliminar elementos dinámicamente
•	Calcular todas las combinaciones posibles de elementos
•	Determinar la combinación óptima según:
  -	Cumplir el mínimo de calorías
  -	No exceder el peso máximo
  -	Minimizar el peso total
  -	En caso de empate en peso, maximizar las calorías
*******************************************************
Enfoque utilizado
El problema se resuelve utilizando un algoritmo de búsqueda mediante recursividad, evaluando todas las combinaciones posibles de elementos (inclusión y exclusión).

Funcionamiento general
1.	El usuario ingresa:
  -	Calorías mínimas requeridas
  -	Peso máximo permitido
2.	El usuario agrega elementos indicando:
  -	Nombre
  -	Peso
  -	Calorías
3.	El sistema:
  -	Genera todas las combinaciones posibles
  -	Filtra las combinaciones inválidas
  -	Selecciona la mejor combinación válida
4.	El resultado se muestra en pantalla con:
  -	Elementos seleccionados
  -	Peso total
  -	Calorías totales
*******************************************************
Tecnologías utilizadas
  -	HTML: Interfaz de usuario
  -	CSS: Estilos 
  -	JavaScript: Lógica del sistema
