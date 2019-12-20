const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
    .then(function (response) {
        return response.json()
    })
    .then(function (trainerData) {
        trainerData.forEach(addTrainerCard)
    })

function addTrainerCard(trainer) {
    const mainSection = document.querySelector('main')
    const cardSection = document.createElement('div')
    mainSection.append(cardSection)
    // cardSection.setAttribute('data-id', `${trainer.id}`)
    cardSection.className = "card"

    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    cardSection.append(trainerName)

    const addBtn = document.createElement('button')
    addBtn.innerText = "Add Pokemon"
    cardSection.append(addBtn)

    const ulSection = document.createElement('ul')
    cardSection.append(ulSection)

    addPokemonEventListener(addBtn, trainer, ulSection)

    trainer.pokemons.forEach(function (pokemon) {
        addPokemon(pokemon, ulSection)
    })
}

function addPokemon(pokemon, ulSection) {

    const pokemonList = document.createElement('li')
    if (ulSection.children.length + 1 <= 6) {
        pokemonList.innerText = `${pokemon.nickname} (${pokemon.species})`

        releaseBtn = document.createElement('button')
        releaseBtn.className = "release"
        releaseBtn.innerText = "Release"
        ulSection.append(pokemonList)
        pokemonList.append(releaseBtn)
    }
    releasePokemonEventListener(releaseBtn, pokemon, pokemonList)
}

function addPokemonEventListener(addBtn, trainer, ulSection) {
    addBtn.addEventListener('click', function () {
        fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "trainer_id": trainer.id
                })
            })
            .then(function (response) {
                return response.json()
            })
            .then(function (pokemon) {
                addPokemon(pokemon, ulSection)
            })
    })
}


function releasePokemonEventListener(releaseBtn, pokemon, listItem) {
    listItem.style.display = ""

    releaseBtn.addEventListener('click', function () {
        fetch(`${POKEMONS_URL}/${pokemon.id}`, {
                method: "DELETE"
            })
            .then(function (response) {
                return response.json()
            })
        listItem.style.display = "none"
        listItem.remove()
    })
}