//Adicionando a URL do WS 
const wsURL = 'https://pokeapi.co/api/v2/pokemon/';

//elementos
var pokeName, pokemon, card;

//funções
//função que retorna o card com informações do pokemon
function createCard(){
    card = `<div class="pokemon-picture">
            <img src="${pokemon.sprites.front_default}" alt="Imagem of ${pokemon.name}" >
        </div>
        <div class="pokemon-info">
            <h1 class="name">Name: ${pokemon.name}</h1>
            <h2 class="number">Número: ${pokemon.id}</h2>
            <h3 class="type">Type: ${pokemon.types.map(item => item.type.name).toString()}</h3>
            <h3 class="skill">Skills: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
            <h3 class="weight">Peso: ${pokemon.weight / 10}kg</h3>
            <h3 class="height">Altura: ${pokemon.height * 10}cm</h3>
        </div>`;
        return card;
}

//função responsável pela request da api
function requestPockInfo(url,name){
        fetch(url + name).then(response => response.json()).then(data => {pokemon = data;})
        .catch(err => console.log(err));
}

//seletor de elementos html
searchInput = document.querySelector('.search-input');
searchButton = document.querySelector('.search-button');
container = document.querySelector('.pokemon');
erroMessage = document.querySelector('.error');

function startAPP(par_pokeName){
    requestPockInfo(wsURL, par_pokeName);

    setTimeout( function(){
        if(pokemon.detail){
            erroMessage.style.display = 'block';
            container.style.display = 'none';
        }else{
            erroMessage.style.display = 'none';
            container.style.display = 'flex';
            container.innerHTML = createCard();
        }
    }, 2000);
}

//evento
searchButton.addEventListener("click", event => {
    event.preventDefault();
    pokeName = searchInput.value.toLowerCase();
    startAPP(pokeName);
    container.classList.add('fade');
    setTimeout(() => {
        container.classList.remove('fade');
    },3000);
})