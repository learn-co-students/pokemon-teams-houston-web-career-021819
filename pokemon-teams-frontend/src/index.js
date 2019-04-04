const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// fetch for the trainers
mainArea = document.querySelector('#main')
document.addEventListener("DOMContentLoaded", function(){
    fetch(TRAINERS_URL)
        .then(function(response){
            return response.json();
        })
        .then(function(trainersList){
            for(let i = 0; i < trainersList.length; i++) {
                const documentCards = document.createElement("div")
                documentCards.setAttribute("class", "card")
                mainArea.append(documentCards)
                const trainer = trainersList[i] 
                let trainer_p_tag = document.createElement("p")
                trainer_p_tag.innerText = trainer.name
                // append trainer_p_tag to document later
                documentCards.append(trainer_p_tag)
                const ul = document.createElement("ul")
                addPokemonButton(trainer,documentCards)
                documentCards.append(ul)
                pokemonList = trainer.pokemons
                //////////////////////////////////////////////
                /////////////////////////////////////////////
                for(let i = 0; i < pokemonList.length; i++) {
                    currentPokemon = pokemonList[i]
                    const pokemonLI = document.createElement("li")
                    ul.append(pokemonLI)
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

    function addPokemonButton(trainer,trainerCard) {
        const addButton = document.createElement("button")
        addButton.innerText = "Add Pokemon"
        trainerCard.append(addButton)
        addPokemon(trainer,addButton,trainerCard)
    }

    function addPokemon(trainer,button, card) {
        
        button.addEventListener("click", function(){
           if(hasLessThan6(card)){
            fetch(`${POKEMONS_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "trainer_id": trainer.id
                })
            }).then(function(pokemon){
                return pokemon.json()
            }).then(function(poke){
                list=card.querySelector('ul')
                item = document.createElement('li')
                item.innerText = `${poke.nickname} - ${poke.species} `
                releasePokemonButton(poke,item)
                list.append(item)
            })}
        })
    }
    function hasLessThan6(card){
        list = card.querySelector('ul')
        if(list.children.length < 6){
            return true
        }else{
            return false
        }
    }
})