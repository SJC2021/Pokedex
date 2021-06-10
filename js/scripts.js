let pokemonList = [{name: "Gengar", height: 1.5, types: ["fighting" ,"ghost"]},
                   {name: "Hypno", height: 1.6, type: ["psychic"]},
                   {name: "Breloom", height: 1.2, type: ["flying", "grass"]}
                 ];

for (let i=0; i < pokemonList.length; i++) {
                     //Writes Pokemon name to the DOM
                     document.write(pokemonList[i].name + " (height :" + pokemonList[i].height + ")");
                   //Checks if pokemon height is greater than 1.6 m
                     if (pokemonList[i].height > 1.5) {
                       //if pokemon height is greater than 1.6 m, writes "Wow that's big!"
                       document.write(" - Wow, that's big!");
                     }
                     //Adds line breaks after each pokemon name
                     document.write("<br><br>");
                   }
