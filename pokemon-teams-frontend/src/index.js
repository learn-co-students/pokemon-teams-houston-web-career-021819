const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', function () {
    fetch(TRAINERS_URL)
        .then(function (response) {
            return response.json()
        })
        .then(function (trainerList) {

            for (let i = 0; i < trainerList.length; i++) {
                //get trainer name
                const trainerName = trainerList[i].name

                //create div for each card
                let div = document.createElement('div')
                div.setAttribute("class", "card")
                div.setAttribute("data-id", `${trainerList[i].id}`)
                //create div-p for each trainerName
                let p = document.createElement('p')
                div.appendChild(p)
                p.innerText = trainerName
                //create button for add pokemon
                let addButton = document.createElement('button')
                addButton.setAttribute("data-trainer-id", `${trainerList[i].id}`)
                addButton.innerText = "Add Pokemon"
                div.appendChild(addButton)


                //create ul for each trainer
                let ul = document.createElement('ul')
                //get each trainer's pokemons
                const pokemonList = trainerList[i].pokemons
                //iterate pokemon list
                for (let j = 0; j < pokemonList.length; j++) {
                    //create li for each pokemon
                    let li = document.createElement('li')
                    //release button
                    let releaseButton = document.createElement('button')
                    releaseButton.setAttribute("class", "release")
                    releaseButton.setAttribute("data-pokemon-id", `${pokemonList[j].id}`)
                    releaseButton.innerText = "Release"
                    //add event to releaseButton
                    releaseButton.addEventListener('click', function () {
                        fetch(`${POKEMONS_URL}/${pokemonList[j].id}`, {
                            method: "DELETE"
                        })
                        li.remove();
                    })
                    //add li innerText
                    li.innerHTML = `${pokemonList[j].nickname} (${pokemonList[j].species})`
                    li.append(releaseButton)
                    //add li to ul
                    ul.append(li)
                }
                div.append(ul)
                main.append(div)

                //fetch pokemon data

                //add event to addButton
                addButton.addEventListener('click', function (e) {
                    //check if the ul has 6 nodes 
                    if (ul.children.length < 6) {

                        e.preventDefault();
                        //each time when we click the button, we get a new pokemon
                        //below creates a new pokemon each time
                        fetch(POKEMONS_URL, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "trainer_id": trainerList[i].id
                            })
                        })
                            .then(function (response) {
                                return response.json()
                            })
                            .then(function (pokemonData) {


                                //create HTML element for the new pokemon
                                let li = document.createElement('li')
                                li.innerText = `${pokemonData.nickname} (${pokemonData.species})`
                                ul.append(li)

                                //release button
                                let releaseButton = document.createElement('button')
                                releaseButton.setAttribute("class", "release")
                                releaseButton.setAttribute("data-pokemon-id", `${pokemonData.id}`)
                                releaseButton.innerText = "Release"
                                //add event to releaseButton
                                releaseButton.addEventListener('click', function () {
                                    fetch(`${POKEMONS_URL}/${pokemonData.id}`, { method: "DELETE" })
                                    li.remove();
                                })
                                //append release Button
                                li.append(releaseButton)


                            })
                    }
                })

            }
        })

})
