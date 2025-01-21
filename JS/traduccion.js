// Archivo: translations.js

const translations = {
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
        fairy: 'Hada',
        dark: 'Siniestro',
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