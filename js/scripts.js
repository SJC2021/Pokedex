
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=900';

  // push pokemon

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Please use objects to input new pokemon');
    }
  }
  function add(pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll() {
      return pokemonList;
    }
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
//  pokemonList & PokemonItems
	function addListItem(pokemon){
	  let pokemonList = document.querySelector('.list-group'); // variable assigned to <ul> in index.html
	  let listItem = document.createElement('li'); // variable creating a list item
	  button.innerText = pokemon.name; // assigning the button text to be the pokemon name
	  // adds bootstrap class
	  button.classList.add('btn');
	  button.classList.add('btn-primary');
	  button.classList.add('btn-lg');
	  button.setAttribute('data-target', '#exampleModal');
	  button.setAttribute('data-toggle', 'modal');

	  listItem.appendChild(button);
	  pokemonList.appendChild(listItem);
		button.addEventListener('click', function(){
			showDetails(pokemon);
		});

	}

	//  Fetch pokemon list from API
	function loadList() {
		return fetch(apiUrl).then(function (response) {
			return response.json();
		}).then(function(json) {
			json.results.forEach(function(item) {
				let pokemon = {
					name: item.name,
					detailsUrl: item.url,
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		});
	}

	// Fetch pokemon details from API list
	function loadDetails(item) {
		let url = item.detailsUrl;
		return fetch(url).then(function (response){
			return response.json();
		}).then(function (details) {
			// below code adds the details to the item
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			// calls the types array
			item.types = [];
			for ( let i = 0; i < details.types.length; i++) {
				item.types.push(details.types[i].type.name);
			}
		}).catch(function (e) {
			console.error(e);
		});
	}

	// Searchbar:

	function search() {
		let searchInput = document.querySelector('#search-bar');

		searchInput.addEventListener('input', function() {

			let displayedList = document.querySelector('.list-group');
			displayedList.innerHTML = '';
			let searchText = searchInput.value.trim();

			pokemonList.forEach(function(pokemon) {
				if (pokemon.name.includes(searchText.toLowerCase())) {
					addListItem(pokemon)
				}
			});

		});
	}

	// displays modal
	function showModal(pokemon) {

		let modalBody = $('.modal-body');
		let modalTitle = $('.modal-title');
		let modalHeader = $('.modal-header');

		// Clears existing modal content
		modalTitle.empty();
		modalBody.empty();

		// // creates title <h1> element
		let nameElement = $('<h1>' + pokemon.name + '</h1>');

		let imageElement = $('<img class="modal-img" style="width:50%">');
		imageElement.attr('src', pokemon.imageUrl);

		let typeElement = $('<p>' + pokemon.types + '</p>');
		let heightElement = $('<p>' + pokemon.height + '</p>');

		modalTitle.append(nameElement);
		modalBody.append(imageElement);
		modalBody.append(typeElement);
		modalBody.append(heightElement);


	}



	//  Dispays pokemons
	function showDetails(pokemon){
		pokemonRepository.loadDetails(pokemon).then(function () {
			showModal(pokemon);
			console.log(pokemon);
		});
	}





	// return
	return{
        add: add,
    		getAll: getAll,
    		removeLast:removeLast,
    		addListItem: addListItem,
    		loadList:loadList,
    		loadDetails:loadDetails
	};

})();



pokemonRepository.loadList().then(function() {
	//^^ now the data is loaded
	pokemonRepository.getAll().forEach(function(pokemon){
		pokemonRepository.addListItem(pokemon);
	});
});

pokemonRepository.search();

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
