const pokemonCount = 151;
let pokedex =
  {}; /* STRUCTURE {1 : {"name": "bulbasaur", "img": url, "type": ["grass", "poison"], "description": "..."}} */

window.onload = function () {
  getPokemon(1);
}; /* Onload is an event used to automatically display the 1st pkmn once the page is loaded */

function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

  let res = fetch(url);
  let pokemon = res.json();
  console.log(pokemon);
}
