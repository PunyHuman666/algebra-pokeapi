let ul = document.getElementById("ul-template");
const button = document.querySelector("button");

async function pokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon-color/10/");
  const pokemons = await response.json();
  let source = document.getElementById("template").innerHTML;
  let template = Handlebars.compile(source);

  for (let i = 0; i < 20; i++) {
    const getId = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemons.pokemon_species[i].name}`
    );
    const pokemonId = await getId.json();
    let context = {
      id: pokemonId.id,
      name: pokemons.pokemon_species[i].name.toUpperCase(),
      url: pokemons.pokemon_species[i].url,
      sprite: pokemonId.sprites.front_default,
    };
    ul.innerHTML += template(context);
  }
}

button.addEventListener("click", pokemon);
