const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
 
fetch(TRAINERS_URL)
    .then(function(res){
        return res.json()   
    })
    .then(function(trainerData){
        //itterating through trainers
        trainerData.forEach(function(trainer){
            trainerName = document.createElement('label')
            trainerName.innerText = `Trainer Name: ${trainer.name}` 
            main = document.querySelector('#main')
            main.appendChild(trainerName)
            //itterating through trainer's pokemon
            trainer.pokemons.forEach(function(pokemon){
                properties = document.createElement('li')
                properties.innerText = `Pokemon: ${pokemon.nickname}, Species: ${pokemon.species}`
                trainerName.appendChild(properties)
                properties.appendChild(document.createElement('br'))
                //add delete button
                destroyPokemon = document.createElement('input')
                destroyPokemon.type = 'submit'
                destroyPokemon.value = "Release Pokemon"
                destroyPokemon.className = "destroyPokemon"
                properties.appendChild(destroyPokemon)
                //add eventlistener to submit button
                destroyPokemon.addEventListener('click', function(){
                    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
                        method: 'DELETE'
                    })
            })
    
            })
            //add pokemon button
            addPokemon = document.createElement('input')
            addPokemon.type = 'submit'
            addPokemon.value = "Add Pokemon"
            addPokemon.className = "addPokemon"
            trainerName.appendChild(addPokemon)
            //add eventlistener to submit button
            addPokemon.addEventListener('click', function(){
                if(trainer.pokemons.length < 6){
                    fetch(POKEMONS_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }, 
                        body: JSON.stringify({
                            "trainer_id": trainer.id
                        })
                    })
                }
            })
        })
    })
