
let pokemonRepository = (function (){
    // MODAL
  let modalContainer = document.querySelector('#modal-container');
  let modal = document.querySelector('.modal');
  let modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
  let pokemonName = document.createElement('h1');
    pokemonName.classList.add('Pokemon-name');
  let pokemonHeight = document.createElement('p');
    pokemonHeight.classList.add('Pokemon-height');
  let pokemonType = document.createElement('p');
    pokemonType.classList.add('Pokemon-type');

  let imageContainer = document.createElement('div');
    imageContainer.classList.add('img-container');
  let pokemonImage = document.createElement('img');
    pokemonImage.classList.add('Pokemon-image');


  let pokemonList = [
  ];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


  function add(pokemon) {
    if (
    typeof pokemon === "object" &&
    "name" in pokemon
    ) {
        pokemonList.push(pokemon);
      } else {
        console.log("pokemon is not correct");
      }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
      button.innerText = pokemon.name.toUpperCase();
      button.classList.add("button-class");
      listpokemon.appendChild(button);
      pokemonList.appendChild(listpokemon);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
  }


  function showModal() {
    let modalContainer = document.querySelector('#modal-container";')
    modalContainer.classList.add('is-visible');
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
  }


  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

    modalClose.addEventListener('click' , hideModal);


    window.addEventListener('keydown', (e) => {
 let modalContainer = document.querySelector('#modal-container');
 if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
   hideModal();
 }
});


    modalContainer.addEventListener('click', (e) => {

      let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

  function showDetails(pokemon){
    loadDetails(pokemon).then(function () {
      pokemonName.innerHTML = pokemon.name;
      pokemonHeight.innerHTML = 'Height: ' + pokemon.height;
      pokemonType.innerHTML = 'Type: ' + pokemon.types;
      pokemonImage.src = pokemon.imageUrl;
      modalClose.innerHTML = "Close";
        showModal();
    });

    modal.appendChild(modalClose);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonType);
    modal.appendChild(imageContainer);
    imageContainer.appendChild(pokemonImage);
  }



  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }



  function loadDetails(item) {
     let url = item.detailsUrl;
     return fetch(url).then(function (response) {
       return response.json();
     }).then(function (details) {
       item.imageUrl = details.sprites.front_default;
       item.height = details.height;
       item.types = details.types[0].type.name;
     }).catch(function (e) {
       console.error(e);
     });
   }



    return {
     add: add,
     getAll: getAll,
     addListItem: addListItem,
     loadList: loadList,
     loadDetails: loadDetails,
     showModal: showModal,
     hideModal: hideModal
    };

})();

Object.keys(pokemonRepository).forEach(function(property) {
console.log(pokemonRepository[property]);
});

// pokemonRepository.add({ name: 'Moltres', height: 2, type: ['Fire','Flying'] });
  // console.log(pokemonRepository.getAll());
    pokemonRepository.loadList().then(function () {
        pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
        });
    });

let result = pokemonRepository.getAll().filter(pokemon => pokemon.length > 4);
  console.log(result);
