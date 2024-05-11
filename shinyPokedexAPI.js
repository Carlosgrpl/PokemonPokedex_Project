const pokemonCount = 151;
let pokedex =
  {}; /* STRUCTURE {1 : {"name": "bulbasaur", "img": url, "type": ["grass", "poison"], "description": "..."}} */

window.onload = async function () {
  getPokemon(1);
}; /* Onload is an event used to automatically display the 1st pkmn once the page is loaded */
/* Fetch always go wit async and await, it NEEDS an async function to work properly */
async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

  let res = await fetch(url);
  /* Every time you have await in a function you need to use an async function */
  let pokemon = await res.json();
  /* await: Waits for the promise to be fulfilled */ console.log(pokemon);
}

let pokemonName = pokemon["name"];
let pokemonType = pokemon["types"];
let pokemonImage = pokemon["sprites"]["front_shiny"];
