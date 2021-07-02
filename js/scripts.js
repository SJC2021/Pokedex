let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Gengar",
      type: ["fighting", "ghost"],
      height: 1.5
    },
    {
      name: "Hypno",
      type: ["psychic"],
      height: 1.6
    },
    {
      name: "Breloom",
      type: ["flying", "grass"],
      height: 1.2
    },
  ];
  function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }

    return {
      add: add,
      getAll: getAll
    };
  })();

console.log(pokemonRepository.getAll());
pokemonRepository.add(
  {
  name: 'Turtwig',
  type: ["ice"],
  height: 0.4
});
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(pokemon.name + " " + "height : " + pokemon.height + " " + pokemon.type + "</br>");
});

/* for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + "- Height: " + pokemonList[i].height)
  console.log(pokemonList[i].name + " Height: " + pokemonList[i].height)
if ([pokemonList[i].height] < 0.5) {
  document.write(" - This Pokemon is SMOL!")
}
 document.write("<br>");
} */

/*pokemonList.forEach(function(pokemon){
  console.log(pokemon);
});*/
