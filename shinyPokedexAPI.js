const pokemonCount = 151;
let pokedex =
  {}; /* STRUCTURE {1 : {"name": "bulbasaur", "img": url, "type": ["grass", "poison"], "description": "..."}} */

window.onload = async function () {
  /* getPokemon(1); */
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
    /* <div> id="1" class="pokemonName"> BULBASAUR </div>  */
    let pokemon = document.createElement("div");
    pokemon.id = i; /* Whe set the id so that then we can use onclick */
    pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemonName");
    pokemon.addEventListener("click", UpdatePokemon);
    document.getElementById("pkmnList").append(pokemon);
  }
  /* Onload is an event used to automatically display the 1st pkmn once the page is loaded */
  document.getElementById("pkmnDescription").innerText =
    pokedex[1]["description"];
  console.log(pokedex);
};
/* Fetch always go wit async and await, it NEEDS an async function to work properly */
async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

  let res = await fetch(url);
  /* Every time you have await in a function you need to use an async function */
  let pokemon = await res.json();
  /* await: Waits for the promise to be fulfilled */ console.log(pokemon);

  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"]
    .map((type) => type["type"]["name"])
    .join(", "); // Convert types to string
  let pokemonImage = pokemon["sprites"]["front_shiny"];

  /* 
console.log(pokemonDescription); */
  let speciesRes = await fetch(pokemon["species"]["url"]);
  let speciesData = await speciesRes.json();
  let pokemonDescription = speciesData["flavor_text_entries"][2]["flavor_text"];

  pokedex[num] = {
    name: pokemonName,
    img: pokemonImage,
    types: pokemonType,
    description: pokemonDescription,
  };
}

function UpdatePokemon() {
  document.getElementById("pkmnImage").src = pokedex[this.id]["img"];
  /* We need to clear the previous types used */
  let typesDiv = document.getElementById("pkmnTypes");
  while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
  }
  /* Update PKMN types */
  let types = pokedex[this.id]["types"];
  let typeArray = types.split(", "); // Split the string of types into an array
  for (let i = 0; i < typeArray.length; i++) {
    let type = document.createElement("span");
    type.innerText = typeArray[i].toUpperCase();
    type.classList.add("typeBox");
    type.classList.add(typeArray[i]); /* adds background and font color */
    typesDiv.append(type);
  }

  /* Description */

  /* Description */
  document.getElementById("pkmnDescription").innerText =
    pokedex[this.id]["description"];
}

function searchPokemon() {
  let searchTerm = document.getElementById("searchInput").value.toLowerCase();
  let foundPokemon = Object.values(pokedex).find((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );
  if (foundPokemon) {
    let pokemonId = Object.keys(pokedex).find(
      (key) => pokedex[key] === foundPokemon
    );
    document.getElementById(pokemonId).click();
  } else {
    alert("Pokemon not found!");
  }
}
