const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D31',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


// Naturalezas y sus efectos
const naturalezas = {
    Firme: { aumenta: 'attack', reduce: 'special-attack' },
    Osada: { aumenta: 'defense', reduce: 'attack' },
    Audaz: { aumenta: 'attack', reduce: 'speed' },
    Serena: { aumenta: 'special-defense', reduce: 'attack' },
    Modesta: {aumenta: 'special-attack', reduce: 'attack' },
    Timida: {aumenta: 'speed', reduce: 'attack' },
    Fuerte: {aumenta: 'attack', reduce: 'attack'},
    Huraña: {aumenta: 'attack', reduce: 'defense'},
    Dócil: {aumenta: 'defense', reduce: 'defense'},
    Afable: {aumenta: 'special-attack', reduce: 'defense'},
    Amable: {aumenta: 'special-attack', reduce: 'defense'},
    Activa: {aumenta: 'speed', reduce: 'defense'},
};


// Fórmulas para calcular estadísticas totales
function calcularStatsTotales(baseStats, iv, ev, nivel, multiplicador) {
    if (baseStats === 'hp') {
        return Math.floor(((2 * iv + ev / 4) * nivel) / 100 + nivel + 10);
    } else {
        return Math.floor((((2 * iv + ev / 4) * nivel) / 100 + 5) * multiplicador);
    }
}

// Funcion de calcular stats finales
function calcularStatsFinales(baseStats, ivs, evs, nivel, naturaleza) {
    console.log("Base Stats recibidos:", baseStats);
    console.log("IVs antes de llamar a la función:", ivs);
    console.log("EVs antes de llamar a la función:", evs);
    console.log("Naturaleza seleccionada:", naturaleza);
    const stats = { ...baseStats }; // Copiar stats base
    const efecto = naturalezas[naturaleza];

    // Recalcular cada stat
    Object.keys(stats).forEach(stat => {
        const multiplicador = efecto
            ? stat === efecto.aumenta
                ? 1.1
                : stat === efecto.reduce
                ? 0.9
                : 1
            : 1;

        stats[stat] = calcularStatsTotales(baseStats[stat], ivs[stat], evs[stat], nivel, multiplicador);
    });
    console.log("Efecto de la naturaleza:", efecto);

    console.log("Stats calculados dentro de la función:", stats);
    return stats;
}





const fetchAllPokemons = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000"); // O el límite que desees
        const data = await response.json();
        allPokemon = data.results; // Almacenamos todos los Pokémon

        // Ahora obtenemos los detalles de cada Pokémon
        const pokemonDetails = await Promise.all(allPokemon.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url); // Accedemos a la URL de cada Pokémon
            const pokemonData = await pokemonResponse.json();
            return {
                name: pokemonData.name,
                id: pokemonData.id,
                photo: pokemonData.sprites.front_default,
                types: pokemonData.types.map((type) => type.type.name), // Mapear los tipos de Pokémon
            };
        }));
        allPokemon = pokemonDetails;
        renderCurrentPage(); // Renderizamos la primera página
        updateNavigationButtons(); // Actualizamos los botones de navegación
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
}



// barra de búsqueda
const searchPokemon = async (event) => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    const busqueda = value.trim().toLowerCase();

    // lanza una alerta si la palabra es menor a 3 letras
    if (busqueda.length < 3) {
        alert("Escriba al menor 3 letras");
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");
        const data = await response.json();

        // Limpiar los resultados previos y renderizar en el contenedor de búsqueda
        const searchResultsContainer = document.getElementById("pokemon-search-results");
        searchResultsContainer.innerHTML = '';  // Limpiar resultados anteriores


         // Crear la tarjeta usando getMinPoke
         const card = getMinPoke({
            photo: data.sprites.front_default,
            name: data.name,
            id: data.id,
            types: data.types.map(type => type.type.name),
        });

        searchResultsContainer.appendChild(card);  // Mostrar la tarjeta de Pokémon encontrado

    } catch (error) {
        renderNotFound();
    }
}



const resetSearch = () => {
    // Limpiar el campo de entrada
    document.querySelector('input[name="pokemon"]').value = "";

    // Restaurar el contenedor de búsqueda
    const searchResultsContainer = document.getElementById("pokemon-search-results");
    searchResultsContainer.innerHTML = "";

    // Renderizar las cartas de Pokémon paginadas nuevamente
    renderCurrentPage();
    updateNavigationButtons();
};



// la carta que sale si no existe el pokemon
const renderNotFound = () => {
    // Seleccionar el contenedor donde se mostrarán las tarjetas
    const searchResultsContainer = document.getElementById("pokemon-search-results");

    // Crear dinámicamente la tarjeta de "Pokémon no encontrado"
    const notFoundCard = document.createElement("div");
    notFoundCard.classList.add("poke-card"); // Añadir clases para estilo (ajusta según tu CSS)

    notFoundCard.innerHTML = `
        <div class="poke-img-container">
            <img src="img/poke-shadow.png" alt="Sombra" class="poke-img" />
        </div>
        <div class="poke-name">Pokémon no encontrado</div>
    `;

    // Limpiar cualquier resultado previo y agregar la nueva tarjeta al contenedor
    searchResultsContainer.innerHTML = ""; // Limpiar resultados anteriores
    searchResultsContainer.appendChild(notFoundCard);
}



document.addEventListener("DOMContentLoaded", () => {
    fetchAllPokemons(); // Llamada a la función que obtiene los Pokémon
    const searchForm = document.querySelector("form");
    searchForm.addEventListener("submit", searchPokemon);
});









let currentLanguage = 'es'; // Idioma predeterminado



// Ajuste en getMinPoke para pasar datos correctamente
const getMinPoke = ({ photo, name, id, types }) => {
    const card = document.createElement('div');
    card.className = 'poke-card';

    const pokemonTypes = types?.map(type => type) || [];
    // const pokemonTypes = types?.map(type => translate(`types.${type}`, currentLanguage)) || [];

    card.innerHTML = `
        <div class="poke-name">${name}</div>
        <div class="poke-img-container">
            <img src="${photo}" alt="${name}" class="poke-img" />
        </div>
        <div class="poke-id">Nº ${id}</div>
        <div class="poke-types">
            ${pokemonTypes.map(type => 
                `<div style="background-color: ${typeColors[type] || typeColors.default}; color: white;">
                    ${translate(`types.${type}`, currentLanguage)}
                </div>`
            ).join("")}
        </div>
    </div>
    `; 
    card.addEventListener('click', () => {
        const pokemonDetailContainer = document.getElementById('pokemon-search-results');
        pokemonDetailContainer.innerHTML = '';
        renderPokemonDetails(id);
    });
    return card;
};



// Función para cambiar el idioma
function toggleLanguage() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es'; // Cambia entre español e inglés
    
    // Llamar a la función que actualiza todos los textos en la página
    updatePageLanguage();
}

// Función para actualizar todos los textos según el idioma seleccionado
function updatePageLanguage() {
    // Actualizar los textos en las cartas de Pokémon
    const pokemonCards = document.querySelectorAll('.poke-card');
    pokemonCards.forEach(card => {
        const nameElement = card.querySelector('.poke-name');
        const idElement = card.querySelector('.poke-id');
        const typesElement = card.querySelector('.poke-types');
        
        if (nameElement) nameElement.textContent = translate('name', currentLanguage);
        if (idElement) idElement.textContent = translate('id', currentLanguage);
        
        if (typesElement) {
            typesElement.innerHTML = pokemonTypes.map(type => 
                `<div style="background-color: ${typeColors[type] || typeColors.default}; color: white;">${translate(`types.${type}`, currentLanguage)}</div>`
            ).join("");
        }
    });

    // Actualizar el contenido de las habilidades y estadísticas cuando se esté viendo un Pokémon específico
    const pokemonDetailContainer = document.querySelector('.poke-detail-container');
    if (pokemonDetailContainer) {
        const abilitiesSection = pokemonDetailContainer.querySelector('h3:nth-of-type(1)');
        const baseStatsSection = pokemonDetailContainer.querySelector('h3:nth-of-type(3)');
        const finalStatsSection = pokemonDetailContainer.querySelector('.final-stats h3');

        if (abilitiesSection) abilitiesSection.textContent = translate('abilities', currentLanguage);
        if (baseStatsSection) baseStatsSection.textContent = translate('stats.base', currentLanguage);
        if (finalStatsSection) finalStatsSection.textContent = translate('stats.final', currentLanguage);
        
        // Actualizar IVs & EVs, y otros textos
        const ivsLabel = pokemonDetailContainer.querySelector('h3:nth-of-type(2)');
        const levelLabel = pokemonDetailContainer.querySelector('h3:nth-of-type(4)');
        
        if (ivsLabel) ivsLabel.textContent = translate('ivs', currentLanguage);
        if (levelLabel) levelLabel.textContent = translate('level', currentLanguage);
    }

    // Actualizar las estadísticas finales si están presentes
    actualizarStats();
}

// Asignar el evento al botón de cambio de idioma



async function translateAbilities(abilities, language = 'es') {
    return await Promise.all(
        abilities.map(async (ability) => {
            try {
                const response = await fetch(ability.url);
                const data = await response.json();
                const translation = data.names.find((name) => name.language.name === language);
                return translation ? translation.name : ability.name;
            } catch (error) {
                console.error("Error al traducir la habilidad:", ability.name, error);
                return ability.name;
            }
        })
    );
}




async function getAPoke(pokemon) {
    const {photo, name, id, types, abilities, baseStats} = pokemon;

    const ivs = { hp: 31, attack: 31, defense: 31, speed: 31, 'special-attack': 31, 'special-defense': 31 };
    const evs = { hp: 0, attack: 0, defense: 0, speed: 0, 'special-attack': 0, 'special-defense': 0 };
    let nivel = 10;

    // Obtener el tipo principal (primer tipo) y su color
    const mainType = types?.[0] || 'default';  // Si no tiene tipos, usamos 'default'
    const mainTypeColor = typeColors[mainType] || typeColors.default;

   // Traducción de habilidades
   const translatedAbilities = await translateAbilities(abilities, currentLanguage);
   const habilidadesNormales = translatedAbilities.filter((_, i) => !abilities[i].hidden).join(', ');
   const habilidadOculta = translatedAbilities.find((_, i) => abilities[i].hidden) || translate('stats.hidden', currentLanguage);

    // Generar las estadísticas base con traducción
    const baseStatsHtml = Object.entries(baseStats)
        .map(([stat, value]) => `<p>${translate(`stats.${stat}`, currentLanguage)}: ${value}</p>`)
        .join('');

    const card = document.createElement('div');
    card.className = 'poke-detail-container';

    card.innerHTML = `
    <div class="poke-card">
        <div class="poke-name">${name}</div>
        <div class="poke-img-container">
            <img src="${photo}" alt="${name}" class="poke-img" />
        </div>
        <div class="poke-id">Nº ${id}</div>
        <div class="poke-types">
            ${types.map(type => 
                `<div style="background-color: ${typeColors[type] || typeColors.default}; color: white;">
                    ${translate(`types.${type}`, currentLanguage)}
                </div>`
            ).join("")}
        </div>
    
        <h3>${translate("stats.abilities", currentLanguage)}</h3>
        <p>${translate("stats.normal", currentLanguage)}:  ${habilidadesNormales}</p>
        <p>${translate("stats.hidden", currentLanguage)}: ${habilidadOculta}</p>

        <h3>${translate('stats.base', currentLanguage)}</h3>
        <div class="base-stats">
            ${baseStatsHtml}
        </div>

        <h3>IVs & EVs</h3>
        <div class="ivs-container">
            ${Object.keys(ivs).map(stat => `
                <div class="stat">
                    <label>${translate(`stats.${stat}`, currentLanguage).toUpperCase()}:  </label>
                    IV: <input type="number" class="iv-input" data-stat="${stat}" min="0" max="31" value="${ivs[stat]}">
                    EV: <input type="number" class="ev-input" data-stat="${stat}" min="0" max="252" value="${evs[stat]}">
                </div>
            `).join('')}
        </div>

        <h3>${translate('stats.nature', currentLanguage)}</h3>
        <select id="naturaleza-select">
            ${Object.keys(naturalezas).map(nat => `<option value="${nat}">${nat}</option>`).join('')}
        </select>

        <h3>${translate('stats.level', currentLanguage)}</h3>
        <input type="number" id="nivel-input" min="1" max="100" value="${nivel}">
        <div class="final-stats">
            <h3>${translate('stats.final', currentLanguage)}</h3>
            <div id="stats-calculation"></div>
        </div>
    </div>
    `;

    const pokeCard = card.querySelector('.poke-card');
    pokeCard.style.backgroundColor = mainTypeColor;

    console.log("Stats", baseStats);
    // card.style.backgroundColor = typeColors[tipos[0]];

    const statsContainer = card.querySelector('#stats-calculation');
    const selectNaturaleza = card.querySelector('#naturaleza-select');
    const nivelInput = card.querySelector('#nivel-input');
    const ivInputs = card.querySelectorAll('.iv-input');
    const evInputs = card.querySelectorAll('.ev-input');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const volverButton = document.getElementById('backButton');
    prevButton.setAttribute('hidden','');
    nextButton.setAttribute('hidden','');
    volverButton.removeAttribute('hidden');

    volverButton.addEventListener('click', () =>  {
        currentPage = 1;
        renderCurrentPage();
        nextButton.removeAttribute('hidden');
        prevButton.removeAttribute('hidden');
        volverButton.setAttribute('hidden','');
        updateNavigationButtons();
    });

    // Función para actualizar las estadísticas finales
    function actualizarStats() {
        const naturalezaSeleccionada = selectNaturaleza.value;
        const statsFinales = calcularStatsFinales(baseStats, ivs, evs, nivel, naturalezaSeleccionada);

        console.log("Naturaleza seleccionada:", naturalezaSeleccionada);
        console.log("Nivel seleccionado:", nivel);
        console.log("Stats Finales calculados:", statsFinales);

        statsContainer.innerHTML = Object.entries(statsFinales).map(([stat, valor]) => {
            const translatedStat = translate(`stats.${stat}`, currentLanguage); // Traducir la clave de la estadística
            return `
                <p>${translatedStat}: ${valor}</p>
            `;
        }).join('');
    }



    // Eventos para capturar cambios en los inputs
    nivelInput.addEventListener('input', (e) => {
        nivel = parseInt(e.target.value) || 1;
        actualizarStats();
    });

    ivInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const stat = e.target.dataset.stat;
            ivs[stat] = parseInt(e.target.value) || 0;
            actualizarStats();
        });

    });

    evInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const stat = e.target.dataset.stat;
            evs[stat] = parseInt(e.target.value) || 0;
            actualizarStats();
        });
    });

    selectNaturaleza.addEventListener('change', actualizarStats);

    // Inicializar estadísticas finales
    actualizarStats();

    return card;
}





// Renderizar detalles de un Pokémon
async function renderPokemonDetails(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    // Extraer estadísticas base del Pokémon
    const baseStats = data.stats.reduce((acc, stat) => {
        acc[stat.stat.name] = stat.base_stat;
        return acc;
    }, {});

    console.log("Base Stats:", baseStats); // Verificar las estadísticas base


    const card = await getAPoke({
        photo: data.sprites.front_default,
        name: data.name,
        id: data.id,
        types: data.types.map(t => t.type.name),
        abilities: data.abilities.map(abil => ({
            name: abil.ability.name,
            hidden: abil.is_hidden,
        })),
        baseStats,
        ivs: data.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
        }, {}),
        naturalezas: Object.keys(naturalezas),
    });

    currentPage = data.id; //Con esta asigancion manual hacemos que si entramos en el pokemos que hemos buscado, la página cambiará a la equivalente a la del numero de ese pokemon.

    const container = document.querySelector('#data-poke-container');
    if (container) {
        container.innerHTML = ''; // Limpia el contenido existente
        container.appendChild(card); // Inserta la nueva carta
      } else {
        console.error('El contenedor #data-poke-container no existe en el DOM');
      }
}


// Renderizar estadísticas
const renderPokemonStats = (stats) => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount)
        pokeStats.appendChild(statElement);
    })
}





// Paginacion

const pokemons_por_pag = 12;
let currentPage = 1;
let allPokemon = [];


const paginatePokemons = (allPokemon, page) => {
    const startIndex = (page - 1) * pokemons_por_pag;
    const endIndex = page * pokemons_por_pag;
    return allPokemon.slice(startIndex, endIndex);
}

const renderCurrentPage = () => {
    const paginatedPokemons = paginatePokemons(allPokemon, currentPage);
    const container = document.getElementById("data-poke-container");
    container.innerHTML = "";


    paginatedPokemons.forEach((pokemon, index) => {
        const card = getMinPoke(pokemon);
        container.appendChild(card);
    });
}

const updateNavigationButtons = () => {
    const prevButton = document.querySelector("#prevButton");
    const nextButton = document.querySelector("#nextButton");

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(allPokemon.length / pokemons_por_pag);
};

document.querySelector("#prevButton").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderCurrentPage();
        updateNavigationButtons();
    }
});

document.querySelector("#nextButton").addEventListener("click", () => {
    if (currentPage < Math.ceil(allPokemon.length / pokemons_por_pag)) {
        currentPage++;
        renderCurrentPage();
        updateNavigationButtons();
    }
});



const container = document.querySelector('#data-poke-container');
if (container) {
    container.innerHTML = ''; // Limpiar detalles del Pokémon
    renderCurrentPage(); // Restaurar la lista de Pokémon
    updateNavigationButtons(); // Asegurarse de que los botones de navegación estén actualizados
}