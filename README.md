# Recuperación de Clientes: Pokedex (DAW)
# Hugo Jiménez Martín

# Índice

1. [Introducción](#introducción)
- [Descripción](#descripción)
- [Objetivos](#objetivos)
- [Tecnologías](#tecnologías)

2. [Guía de Uso](#guía-de-uso)
- [Parte Superior](#parte-superior)
- [Cuerpo](#cuerpo)
- [Carta Ampliada](#carta-ampliada)

3. [Conclusión](#conclusión)


# Introducción

## Descripción

- La Pokédex Interactiva es una aplicación web que permite a los usuarios explorar y obtener información sobre Pokémon en tiempo real. Desarrollada con JavaScript, HTML, y CSS, esta aplicación consume la PokéAPI para ofrecer funcionalidades como:

    - Búsqueda dinámica: Los usuarios pueden buscar Pokémon por nombre o número.
    - Visualización de detalles: Al seleccionar un Pokémon, se muestran estadísticas detalladas como sus tipos, estadísticas base, y más.
    - Navegación: Los usuarios pueden moverse entre las páginas de la lista general de Pokémon.
    - Interfaz intuitiva: Diseño visualmente atractivo con tarjetas dinámicas y colores según el tipo del Pokémon..

## Objetivos

- Implementar una **Pokedex** funcional que consuma los datos de una API. Experiencia interactiva mediante:
un **buscador**, con un mínimo de tres letras, **paginación**, **botones** para navegar entre páginas, **getMinPoke**: la carta inicial (nombre, foto, id, tipo/s), **getAPoke**: la carta desplegada con los detalles del pokemon (anterior + habilidades "ocultas o normales", stats base, inputs para añadir valores y modificar los stats, elección de la naturaleza, selección del nivel y stats finales actualizables en tiempo real), además de tener un fondo de color dependiendo del tipo de pokemon (fuego - rojo). También un botón para cambiar el idioma Español - Inglés, mediante el consumo de un json.

## Tecnologías

- HTML
- CSS
- JavaScript

## Guía de uso

### Parte superior

- Botones de navegación: si es la primera página el boton **anterior** estará desabilitado y **siguiente**.
- Botón de cambio de idioma: para alternar entre la página en **inglés** y **español**.
- Buscador: form para escribir el nombre y boton para buscar el pokemon.

### Cuerpo

- Cartas: agrupación de 12 cartas por página, cada una con la opción de hacer clic y ampliar la carta, para ver sus detalles.

### Carta ampliada

- Boton volver: este botón sirve para volver a la página inicial de la pokedex.
- Botón de cambio de idioma: sirve para volver a iniciar la pokedex en el otro idioma.
- Inputs de valores: para añadir los valores con límite para los stats finales.
- Selección de Naturaleza: select para seleccionar la naturaleza que tendrá el pokemon.
- Input de nivel: para modificar los stats finales en base al nivel del pokemon.

## Conclusión

- Un proyecto muy chulo, con altibajos, debido a algunos errores y el desconocimiento de ellos,
pero al final tras prueba y error, lo he podido sacar. Al acabar el proyecto me he quedado orgulloso
de lo que he hecho y por eso lo he comentado en el CV.