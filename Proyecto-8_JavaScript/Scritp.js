// Crear un nuevo elemento de audio con la ruta del archivo de audio
let audioElement = new Audio('audio/audio.mp3');

// Función para reproducir la canción
function reproducirCancion() {
    audioElement.play();
}

// Función para pausar la canción
function pausarCancion() {
    audioElement.pause();
}

// Función para obtener el tiempo faltante hasta una fecha específica
function obtenerTiempoFaltante(fechaLimite) {
    let ahora = new Date();
    // Calcular el tiempo restante en segundos
    tiempoFaltante = (new Date(fechaLimite) - ahora + 1000) / 1000;
    // Obtener segundos, minutos, horas y días faltantes
    segundosFaltantes = ('0' + Math.floor(tiempoFaltante % 60)).slice(-2);
    minutosFaltantes = ('0' + Math.floor(tiempoFaltante / 60 % 60)).slice(-2);
    horasFaltantes = ('0' + Math.floor(tiempoFaltante / 3600 % 24)).slice(-2);
    diasFaltantes = ('0' + Math.floor(tiempoFaltante / (3600 * 24))).slice(-2);

    return {
        segundosFaltantes,
        minutosFaltantes,
        horasFaltantes,
        diasFaltantes,
        tiempoFaltante,
    }
}

// Función para realizar la cuenta regresiva y actualizar
function cuentaRegresiva(tiempoFaltante, dias, horas, minutos, segundos, FelizNavidad, mensaje) {
    // Obtener referencias a elementos del DOM
    const d = document.getElementById(dias);
    const h = document.getElementById(horas);
    const m = document.getElementById(minutos);
    const s = document.getElementById(segundos);
    const e = document.getElementById(FelizNavidad);

    // Configurar un intervalo para actualizar el tiempo restante cada segundo
    const tiempoActual = setInterval(() => {
        let t = obtenerTiempoFaltante(tiempoFaltante);

        if (t.tiempoFaltante > 0) {
            // Actualizar  con el tiempo restante
            e.innerHTML = "Faltan para navidad";
            playButton.disabled = true;
            pauseButton.disabled = true;
            d.querySelector('.tiempo .valor').innerHTML = `${t.diasFaltantes}`;
            h.querySelector('.tiempo .valor').innerHTML = `${t.horasFaltantes}`;
            m.querySelector('.tiempo .valor').innerHTML = `${t.minutosFaltantes}`;
            s.querySelector('.tiempo .valor').innerHTML = `${t.segundosFaltantes}`;    
        } else {
            // Habilitar los botones y mostrar un mensaje diferente cuando la cuenta regresiva haya terminado
            playButton.disabled = false;
            pauseButton.disabled = false;
            e.innerHTML = mensaje;
            playButton.classList.add('playing');
            pauseButton.classList.add('playing');
            NoelOff.classList.add("on");
            d.querySelector('.tiempo .valor').innerHTML = `00`;
            h.querySelector('.tiempo .valor').innerHTML = `00`;
            m.querySelector('.tiempo .valor').innerHTML = `00`;
            s.querySelector('.tiempo .valor').innerHTML = `00`;
        }

        if (t.tiempoFaltante < 0) {
            // Limpiar el intervalo cuando el tiempo restante sea menor que cero
            clearInterval(tiempoActual);
        }
    }, 1000);
}

// Iniciar la cuenta regresiva con la fecha especificada y los elementos correspondientes
cuentaRegresiva('Nov 16 2023 00:00:00 GMT-0500', 'dia', 'hora', 'minuto', 'segundo', 'felizNavidad', '¡Feliz Navidad!');

// Evento click del botón de reproducción
document.getElementById('playButton').addEventListener('click', function () {
    if (!this.disabled) {
        reproducirCancion();
    }
});

// Evento click del botón de pausa
document.getElementById('pauseButton').addEventListener('click', function () {
    if (!this.disabled) {
        pausarCancion();
    }
});
