// Archivo: translations.js

const translations = {
    en: {
      types: {
        // electric: '',
        // normal: '#B09398',
        // fire: '#FF675C',
        // water: '#0596C7',
        // ice: '#AFEAFD',
        // rock: '#999799',
        // flying: '#7AE7C7',
        // grass: '#4A9681',
        // psychic: '#FFC6D9',
        // ghost: '#561D31',
        // bug: '#A2FAA3',
        // poison: '#795663',
        // ground: '#D2B074',
        // dragon: '#DA627D',
        // steel: '#1D8A99',
        // fighting: '#2F2F2F',
        // default: '#2A1A1F',
      },
      stats: {
        base: "Base Stats",
        final: "Final Stats",
        ivs: "IVs & EVs",
        level: "Select Pokémon Level",
        nature: "Select Pokémon Nature",
        abilities: "Abilities",
        hidden: "Hidden",
        attack: "Attack",
        defense: "Defense",
        "special-attack": "Special Attack",
        "special-defense": "Special Defense",
        speed: "Speed",
      },
    },
    es: {
      types: {
        electric: "Eléctrico",
        normal: 'Normal',
        fire: 'Fuego',
        water: "Agua",
        ice: 'Hielo',
        rock: 'Roca',
        flying: 'Volador',
        grass: "Planta",
        psychic: 'Psiquico',
        ghost: 'Fantasma',
        bug: 'Bicho',
        poison: 'Veneno',
        ground: 'Tierra',
        dragon: 'Dragon',
        steel: 'Acero',
        fighting: 'Lucha',
        default: 'Predeterminado',
    },
      stats: {
        base: "Estadísticas Base",
        final: "Estadísticas Finales",
        ivs: "IVs & EVs",
        level: "Nivel del Pokémon",
        nature: "Naturaleza del Pokémon",
        abilities: "Habilidades",
        hidden: "Oculta",
        attack: "Ataque",
        defense: "Defensa",
        "special-attack": "Ataque Especial",
        "special-defense": "Defensa Especial",
        speed: "Velocidad ",
      }
    }
  };
  
  // Función para traducir las claves
  function translate(key, language = 'es') {
    const keys = key.split('.');  // Permite acceder a claves dentro de objetos (ej. 'stats.base')
    let result = translations[language];
    
    keys.forEach(k => {
      result = result[k] || k;  // Si no encuentra la clave, usa la clave original
    });
    
    return result;
  }
