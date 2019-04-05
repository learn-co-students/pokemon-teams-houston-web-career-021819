const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
 
fetch(TRAINERS_URL)
    .then(function(res){
        return res.json()   
    })
    .then(function(trainerData){
        //displaying all trainers and their pokemons 
            trainerData.forEach(function(trainer){
            const trainerName = document.createElement('p')
            trainerName.innerText = `${trainer.name}` 
            main = document.querySelector('#main')
            const div = document.createElement('div')
            div.className = 'card'
            main.appendChild(div)
            div.appendChild(trainerName)

            //add pokemon button
            const addPokemon = document.createElement('button')
            addPokemon.innerText = "Add Pokemon"
            addPokemon.className = "addPokemon"
            div.appendChild(addPokemon)

            //Create list
            const ul = document.createElement('ul')
            div.appendChild(ul)
 
            //call createPokemon function
            createPokemon(addPokemon, ul, trainer)

            //displaying each trainer's pokemon
            trainer.pokemons.forEach(function(pokemon){
            const li = document.createElement('li')
            li.innerText = `${pokemon.nickname} (${pokemon.species})`
            ul.appendChild(li)


           
            //call delete pokemon function     
            deletePokemon(trainer, pokemon,li)
    
            })
           
        })
    })
