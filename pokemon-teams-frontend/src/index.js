const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


//this is to get all the trainers
fetch(TRAINERS_URL)
	.then(function (response) {
		return response.json()
	})
	.then(function (trainerData) {
		trainerData.forEach(makeCard);
		//this is to make the card
		function makeCard(trainer) {
			const mainSec = document.querySelector("main")
			const card = document.createElement('div')
			mainSec.append(card);
			card.className = 'card'

			// add trainer name
			const pname = document.createElement('p');
			card.append(pname);
			pname.innerText = trainer.name;

			// add "Add Pokemon" button 
			const addButton = document.createElement('button');
			card.append(addButton)
			addButton.innerText = "Add Pokemon"

			// add pokemons for each trainer
			const ul = document.createElement('ul');
			trainer.pokemons.forEach(function (pokemon) {
				const liTag = document.createElement('li');
				liTag.innerHTML = `
														${pokemon.nickname} (${pokemon.species})
														<button id=${pokemon.id} class=release >Release</button>
							`;
				ul.append(liTag);
			});
			card.append(ul);

			// add "Release Pokemon" button action;
			const releaseButtons = document.querySelectorAll('.release');
			releaseButtons.forEach(function (releaseButton) {
				releaseButton.addEventListener('click', function () {
					//console.log('about to delete pokemon', releaseButton.id);
					fetch(`${POKEMONS_URL}/${releaseButton.id}`, {
						method: 'DELETE'
					}).then(function (response) {
						return response.json();
					}).then(function () {
						window.location.reload();
					});
				});
			});

			// add "Add Pokemon" button action
			addButton.addEventListener('click', function () {
				//console.log('about to add a pokemon');
				fetch(POKEMONS_URL, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						trainer_id: trainer.id
					})
				})
					.then(function (response) {
						return response.json()
					})
					.then(function () {
						window.location.reload();
					});
			});
		}
	});