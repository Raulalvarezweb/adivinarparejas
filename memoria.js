//esta parte es para la pantalla incial del juego
// Seleccionamos los elementos del HTML
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaJuego = document.getElementById('pantalla-juego');
const comenzarJuegoBtn = document.getElementById('comenzar-juego');

// Evento para comenzar el juego
comenzarJuegoBtn.addEventListener('click', function() {
    // Ocultamos la pantalla de inicio
    pantallaInicio.style.display = 'none';

    // Mostramos el tablero del juego
    pantallaJuego.style.display = 'block';
    
    // Llamamos a la función de reiniciar juego (esto puede ser necesario si deseas reiniciar el juego en este punto)
    reiniciarJuego();
});

//aquí empieza el codigo del juego
// TRAEMOS LOS DATOS DEL HTML

// seleccionamos el div que contiene el tablero del juego 
const tablero = document.querySelector('#tablero'); 
const reset = document.getElementById('resetButton');

// Creamos una bandera para saber si el juego ha terminado
let juegoterminado = false;

// creamos un array con las cartas del juego
const cartas = ['assets/1rombo.png', 'assets/2rombo.jpg', 'assets/3rombo.jpg', 'assets/4rombo.jpg', 'assets/5rombo.jpg', 'assets/1picas.jpg', 'assets/2picas.jpg', 'assets/3picas.jpg', 'assets/4picas.png',
    'assets/5picas.jpg', 'assets/1cora.png', 'assets/2cora.jpg', 'assets/3cora.jpg', 'assets/4cora.jpg', 'assets/5cora.png', 'assets/1rombo.png', 'assets/2rombo.jpg', 'assets/3rombo.jpg', 'assets/4rombo.jpg', 'assets/5rombo.jpg', 'assets/1picas.jpg', 'assets/2picas.jpg', 'assets/3picas.jpg', 'assets/4picas.png',
    'assets/5picas.jpg', 'assets/1cora.png', 'assets/2cora.jpg', 'assets/3cora.jpg', 'assets/4cora.jpg', 'assets/5cora.png' ];

// ordenamos de forma aleatoria
cartas.sort(() => Math.random() - 0.5);

// creamos un array vacio para guardar las cartas que se voltean.
const cartasVolteadas = [];

// seleccionamos los elementos del html para mostrar el mensaje, los intentos y las parejas encontradas.
const intentosElem = document.getElementById('intentos');
const parejasEncontradasElem = document.getElementById('parejasEncontradas');
let intentos = 0;
let parejasEncontradas = 0;

const totalParejas = cartas.length / 2;  // Calculamos el total de parejas (la mitad de las cartas)

// seleccionamos un carta aleatoria del array y la mostramos en pantalla
const ramdom = cartas[Math.floor(Math.random() * cartas.length)];


// recorremos el array y agregar cada carta
 for (let i = 0; i < cartas.length; i++) {
    const carta = document.createElement('img'); // creamos cada opcion del array en una imagen
    carta.src = 'assets/reverso.jpg'; // añadimos el reverso de la carta para que se vaya mostrando las cartas
    carta.dataset.cara = cartas[i]; // añadimos el dataset con la carta para mostrar la cara de la cara.
    carta.classList.add('carta');
    tablero.appendChild(carta); // añadimos las cartas al tablero.
}

// Evento principal para manejar el clic en las cartas
tablero.addEventListener('click', function(e) {
     // Si el juego ha terminado, no procesar más clics
     if (juegoterminado) return;

    // Si ya se han volteado dos cartas, no procesar más clics hasta que el setTimeout se complete
    if (e.target.classList.contains('carta') && cartasVolteadas.length < 2) {
        e.target.src = e.target.dataset.cara; // Volteamos la carta seleccionada
        cartasVolteadas.push(e.target); // Añadimos la carta al array de cartas volteadas

        // Si ya hay dos cartas volteadas, comprobamos si son iguales
        if (cartasVolteadas.length === 2) {
            const primerCarta = cartasVolteadas[0];
            const segundaCarta = cartasVolteadas[1];

            if (primerCarta.dataset.cara === segundaCarta.dataset.cara) {
                // Si las cartas son iguales
                parejasEncontradas++;
                parejasEncontradasElem.textContent = parejasEncontradas;

            // Verificamos si hemos encontrado todas las parejas
            if (parejasEncontradas === totalParejas) {
                mostrarMensajeFinal();  // Llamamos a la función para mostrar el mensaje final
            }
                // Limpiamos el array de cartas volteadas
                cartasVolteadas.length = 0; // Mejor usar length = 0 para vaciar el array
                
            } else {
                // Si las cartas no son iguales
                intentos++;
                intentosElem.textContent = intentos;

                // Volvemos a darle la vuelta a las cartas después de un retraso
                setTimeout(function() {
                    primerCarta.src = 'assets/reverso.jpg';
                    segundaCarta.src = 'assets/reverso.jpg';

                    // Limpiamos el array de cartas volteadas
                    cartasVolteadas.length = 0; 
                }, 1000);
            }
        }
    }
});

// Evento para reiniciar el juego
reset.addEventListener("click", reiniciarjuego);


// Evento para reiniciar el juego
function reiniciarjuego() {
    tablero.innerHTML = ''; // Limpiamos el tablero
    cartas.sort(() => Math.random() - 0.5); // Reordenamos las cartas
    cartasVolteadas.length = 0; // Limpiamos el array de cartas volteadas
    intentos = 0;
    parejasEncontradas = 0;
    intentosElem.textContent = intentos;
    parejasEncontradasElem.textContent = parejasEncontradas;

    // Volvemos a agregar las cartas al tablero
    for (let i = 0; i < cartas.length; i++) {
        const carta = document.createElement('img');
        carta.src = 'assets/reverso.jpg';
        carta.dataset.cara = cartas[i];
        carta.classList.add('carta');
        tablero.appendChild(carta);
    }
    
     // Activamos de nuevo el juego
     juegoterminado = false;

}



// Función para mostrar el mensaje de fin del juego
function mostrarMensajeFinal() {
    alert('¡Felicidades! Has encontrado todas las parejas.'); // Mensaje de fin del juego

    // Activamos el botón de reiniciar y lo habilitamos para hacer clic
    juegoterminado = true; // Deshabilitamos el juego al final
}


