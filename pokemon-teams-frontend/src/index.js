//const BASE_URL = "http://localhost:3000"
// const TRAINERS_URL = `${BASE_URL}/trainers`
// const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
  fetch('http://localhost:3000/trainers')
  .then(res => res.json())
  .then(function(trainers){
    const main = document.querySelector('#main')
    trainers.forEach(function(trainer){
      if (document.querySelector(`#trainer-${trainer.id}`) == null) {
        const trainerCard = createTrainerCard(trainer)
        main.append(trainerCard)
      } //why is the dom loading twice??
    })
  })


})

function createTrainerCard(trainer){
  const cardDiv = document.createElement('div')
  cardDiv.className = "card"
  cardDiv.id = `trainer-${trainer.id}`

  const trainerParagraph = document.createElement('p')
  trainerParagraph.textContent = trainer.name

  const addPokemon = document.createElement('button')
  addPokemon.id = `trainer-${trainer.id}-button`
  addPokemon.textContent = "Add Pokemon"

  addPokemon.addEventListener('click', function(){
    checkNumberOfPokemon(trainer)
  })

  const pokemonList = document.createElement('ul')

  trainer.pokemons.forEach(function(pokemon){
    const listItem = addAPokemon(pokemon)
    pokemonList.append(listItem)
  })

  cardDiv.append(trainerParagraph)
  cardDiv.append(addPokemon)
  cardDiv.append(pokemonList)
  return cardDiv
}

function addAPokemon(pokemon){
  const listItem = document.createElement('li')
  listItem.textContent = `${pokemon.nickname} (${pokemon.species})`
  const releasePokemon = document.createElement('button')
  releasePokemon.className = "release"
  releasePokemon.id = `pokemon-${pokemon.id}`
  releasePokemon.textContent = "Release"
  listItem.append(releasePokemon)

  listItem.addEventListener('click', function(){
    fetch(`http://localhost:3000/pokemons/${pokemon.id}`,{
      method: "DELETE"
    })
    listItem.remove()
  })
  return listItem
}

function checkNumberOfPokemon(trainer){
  const trainersCard = document.querySelector(`#trainer-${trainer.id}`)
  const pokemonList = trainersCard.children[2]

  if (pokemonList.children.length < 6) {
    fetch('http://localhost:3000/pokemons', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "trainer_id": trainer.id
      })
    })
    .then(res => res.json())
    .then(function(pokemon){
      const listItem = addAPokemon(pokemon)
      pokemonList.append(listItem)
    })
  }
}
