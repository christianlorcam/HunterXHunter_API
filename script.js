// 1. BASE DE DATOS OFICIAL DE LA ASOCIACIÓN
const baseDatosHxH = [
    {
        id: 405, 
        name: "Gon Freecss",
        age: "14 años",
        nen: "Intensificador",
        occupation: "Cazador Ecológico (Novato)",
        image: "images/01 Gon.webp"
    },
    {
        id: 99, 
        name: "Killua Zoldyck",
        age: "14 años",
        nen: "Transformador",
        occupation: "Ex-Asesino / Cazador Licenciado",
        image: "images/02 Killua.webp"
    },
    {
        id: 404, 
        name: "Kurapika",
        age: "19 años",
        nen: "Materializador (Especialista con Ojos Escarlata)",
        occupation: "Zodiaco (Rata) / Cazador de Listas Negras",
        image: "images/03 Kurapika.webp"
    },
    {
        id: 403, 
        name: "Leorio Paradinight",
        age: "22 años",
        nen: "Emisor",
        occupation: "Zodiaco (Jabalí) / Estudiante de Medicina",
        image: "images/04 Leorio.webp"
    },
    {
        id: 100, 
        name: "Isaac Netero",
        age: "110+ años (Fallecido)",
        nen: "Intensificador (Maestría absoluta)",
        occupation: "Ex-Presidente 12° de la Asociación de Cazadores",
        image: "images/05 Isaac_Netero.webp" 
    },
    {
        id: 999, 
        name: "Meruem (El Rey)",
        age: "40 días de vida",
        nen: "Especialista (Síntesis de Aura)",
        occupation: "Rey Supremo de las Hormigas Quimera",
        image: "images/06 Meruem.webp"
    },
    {
        id: 12, 
        name: "Ging Freecss",
        age: "34 años",
        nen: "Desconocido",
        occupation: "Creador de Greed Island / Explorador DC",
        image: "images/07 Ging.webp"
    },
    {
        id: 1, 
        name: "Beyond Netero",
        age: "Desconocida",
        nen: "Desconocido (Poder de nivel sobreviviente)",
        occupation: "Líder de Expedición al Continente Oscuro",
        image: "images/08 Beyond.webp"
    }
];

// 2. SIMULACIÓN DE CONSULTA AL SERVIDOR CENTRAL
function consultarServidorCazadores(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const registro = baseDatosHxH.find(p => p.id === parseInt(id));
            if (registro) {
                resolve(registro);
            } else {
                reject("ERROR: Licencia inexistente o ID corrupto en el servidor.");
            }
        }, 400); 
    });
}

// 3. CAPTURA DE COMPONENTES DEL DOM
const botonBuscar = document.querySelector('#btnBuscar');
const botonAleatorio = document.querySelector('#btnAleatorio');
const inputBusqueda = document.querySelector('#search-box');

function desplegarInformacion(id) {
    consultarServidorCazadores(id)
        .then(data => {
            document.querySelector("#api-name").textContent = data.name;
            document.querySelector("#api-age").textContent = data.age;
            document.querySelector("#api-nen").textContent = data.nen;
            document.querySelector("#api-occupation").textContent = data.occupation;
            document.querySelector("#picture-style").src = data.image;
        })
        .catch(error => {
            console.error(error);
            alert(error);
        });
}

// 4. EVENT LISTENERS
botonBuscar.addEventListener('click', function() {
    let id = inputBusqueda.value.trim();
    if (id === "") {
        ejecutarAleatorio();
    } else {
        desplegarInformacion(id);
    }
});

botonAleatorio.addEventListener('click', ejecutarAleatorio);

inputBusqueda.addEventListener('keypress', function(event) {
    // Verificamos si la tecla presionada es "Enter"
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita comportamientos extraños del navegador
        botonBuscar.click();    // Simula un clic en el botón de "Escanear ID"
    }
});

function ejecutarAleatorio() {
    const indiceAzar = Math.floor(Math.random() * baseDatosHxH.length);
    const personajeAzar = baseDatosHxH[indiceAzar];
    
    inputBusqueda.value = personajeAzar.id;
    desplegarInformacion(personajeAzar.id);
}
