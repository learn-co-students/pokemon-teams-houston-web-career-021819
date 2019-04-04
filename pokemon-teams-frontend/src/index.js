const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// fetch for the trainers

document.addEventListener("DOMContentLoaded", function(){
    fetch(TRAINERS_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(trainersList){
            for(let i = 0; i < trainersList.length; i++) {
                const documentCards = document.createElement("div")
                documentCards.setAttribute("class", "card")
                document.body.append(documentCards)
                const trainer = trainersList[i] 
                let trainer_p_tag = document.createElement("p")
                trainer_p_tag.innerText = trainer.name
                // append trainer_p_tag to document later
                documentCards.append(trainer_p_tag)
                const ul = document.createElement("ul")
                documentCards.append(ul)
                addPokemonButton(documentCards)
                pokemonList = trainer.pokemons
                //////////////////////////////////////////////
                /////////////////////////////////////////////
                for(let i = 0; i < pokemonList.length; i++) {
                    currentPokemon = pokemonList[i]
                    const pokemonLI = document.createElement("li")
                    documentCards.append(pokemonLI)
                    pokemonLI.innerText = `${pokemonList[i].nickname} - ${pokemonList[i].species}`
                    releasePokemonButton(currentPokemon,pokemonLI)
                }
            }
        })
    function releasePokemonButton(pokemon,li) {
        const byePokemonButton = document.createElement("button")
        byePokemonButton.innerText = "Release"
        byePokemonButton.setAttribute("class", "release")
        li.append(byePokemonButton)
        releasePokemon(pokemon,byePokemonButton,li)
    }

    function releasePokemon(pokemon, button, li) {
        button.addEventListener("click", function(){
            fetch(`${POKEMONS_URL}/${pokemon.id}`, {
                method: "DELETE"
            })
            li.remove() 
        })
    }

    function addPokemonButton(trainerCard) {
        const addButton = document.createElement("button")
        addButton.innerText = "Add Pokemon"
        trainerCard.append(addButton)
        addPokemon(addButton,trainerCard)
    }

    function addPokemon(button, card) {
        button.addEventListener("click", function(){
            fetch(`${POKEMONS_URL}/${pokemon.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "trainer_id": trainer_id
                })
            })
        })
    }
})