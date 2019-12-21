const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function addTrainerCard(trainer) {
    const main = document.querySelector('main')
    const trainerCard = document.createElement('div')
    trainerCard.setAttribute('data-id', trainer.id)
    trainerCard.classList.add('card') 
    main.append(trainerCard)

    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    trainerCard.append(trainerName)

    const addPokemonButton = document.createElement('button')
    addPokemonButton.innerText = "Add Pokemon"
    addPokemonButton.setAttribute('data-trainer-id', trainer.id)
    trainerCard.append(addPokemonButton)

    const pokemonList = document.createElement('ul')
    trainerCard.append(pokemonList)
    
    addPokemonButtonListener(addPokemonButton, trainer)
    
    trainer.pokemons.forEach(function(pokemon){
        addPokemon(pokemon, pokemonList)
    })
   
}

function fetchTrainer() {
    return fetch(TRAINERS_URL)
    .then(function(res){
        return res.json()
    })
    .then(function(trainers){
        trainers.forEach(function(trainer) {
          addTrainerCard(trainer)  
        })
    })
}

fetchTrainer()

function addPokemon(pokemon, pokemonList){
    const pokemonLi = document.createElement('li')
    pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
    pokemonList.append(pokemonLi)

    const releaseButton = document.createElement('button')
    releaseButton.innerText = "Release"
    releaseButton.classList.add("release")
    releaseButton.setAttribute('data-pokemon-id', pokemon.id)
    pokemonLi.append(releaseButton)

    addReleasePokemonButtonListener(releaseButton, pokemon)
}

function addPokemonButtonListener(addPokemonButton, trainer) {
    addPokemonButton.addEventListener('click', function(){
        if (pokemonList.children.length < 6){
           fetch(POKEMONS_URL, {
            method: "POST",
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "trainer_id": trainer.id
            })
            })
            .then (function(res){
                return res.json()
            })
            .then (function(pokemon){
                const pokemonList = document.querySelector(`[data-id='${trainer.id}']`)
                addPokemon(pokemon, pokemonList)
            })
        } else {
            console.log('too many')
        }
    })
}

function addReleasePokemonButtonListener(releaseButton, pokemon) {
    releaseButton.addEventListener('click', function(){     
        fetch(`${POKEMONS_URL}/${pokemon.id}`, {
        method: "DELETE"
        })
        .then (function(res){
            return res.json()
        })
        .then (function(pokemon){
            const pokemonID = document.querySelector(`[data-pokemon-id='${pokemon.id}']`)
            pokemonID.parentElement.remove()
        })
    })
}