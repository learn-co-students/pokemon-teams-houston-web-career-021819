

function createPokemon(addPokemon, ul, trainer){
    
    addPokemon.addEventListener('click', function(){
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                "trainer_id": trainer.id
            })
        })
        .then(function(res){
            return res.json()
        })
        .then(function(pokemonData){
            console.log(ul.children.length + 1)
            if(ul.children.length <= 5){
                let li = document.createElement('li')
                li.innerText = `${pokemonData.nickname} (${pokemonData.species})`
                ul.appendChild(li)
                
               deletePokemon(trainer, pokemonData,li)
            }
        })
    })

}


 

function deletePokemon(trainer, pokemon,li){
    //create delete button
    const destroyPokemon = document.createElement('button')
    destroyPokemon.innerText = "Release"
    destroyPokemon.className = "release"
    li.appendChild(destroyPokemon)


    destroyPokemon.addEventListener('click', function(){
        fetch(`${POKEMONS_URL}/${pokemon.id}`, {
            method: 'DELETE'
        })
       li.remove()
})
}
