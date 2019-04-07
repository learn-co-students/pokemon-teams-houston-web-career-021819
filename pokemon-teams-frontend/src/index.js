const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const root = document.querySelector('main');

fetch(TRAINERS_URL)
    .then(function(response){
        return response.json();
    })
    .then(function(trainersList){      
        trainersList.forEach(function(trainer){
            //console.log(trainer);
            add_t_card(trainer);
            //add_pokemon(trainer);
            //console.log(trainer.pokemons);
        })
    })

   
function add_t_card(trainer){
    const trainer_card_c = document.createElement('div');
    //var class_attr = document.createAttribute('class');
    //class_attr.value = "card";
    //trainer_card_c.setAttributeNode(class_attr);
    trainer_card_c.className = "card";

    var id_attr = document.createAttribute('data-id');
    id_attr.value = trainer.id;
    trainer_card_c.setAttributeNode(id_attr);
    
    const name_c = document.createElement('p');
    name_c.innerText = trainer.name;
    trainer_card_c.append(name_c);

    const button_c = document.createElement('BUTTON');
    //var dti_attr = document.createAttribute('data-trainer-id');
    //dti_attr.value = trainer.id;
    //button_c.setAttributeNode(dti_attr);
    button_c.setAttribute("data-trainer-id",trainer.id)
    button_c.innerText = "Add Pokemon";
    trainer_card_c.append(button_c);

    // function buttonPressed(event){
    //     add_pokemon(trainer);
    // }
    // button_c.addEventListener('command',buttonPressed,true);

    button_c.addEventListener('click',function(){
        add_pokemon(trainer,ul);
    })

    var ul = document.createElement('ul');
    const pokemons_array = trainer.pokemons;

    pokemons_array.forEach(function(pokemon){

        const li = document.createElement('li');
        li.innerText = pokemon.nickname;
        li.value = pokemon.nickname;

        const release = document.createElement('BUTTON');
        release.className = "release";
        release.innerText = "Release";
        release.setAttribute("data-pokemon-id",pokemon.id);
        li.append(release);
        ul.append(li);

        release.addEventListener('click', function(){
            fetch(`${POKEMONS_URL}/${pokemon.id}`, {
                method: 'DELETE',
            })
           // .then(res => res.json())
            //.then(function(trainer){
            //    trainer.pokemons.pop;
           // })THE MOETHOD NAME WE MENTIONED ABOVE IS DELETE . THAT WILL TAKE CARE OF DELETING THIS POKEMON
           //the following line can also be implemented as -->li.remove();
            ul.removeChild(li);
        })
    })
    trainer_card_c.append(ul);
    //const main  = document.getElementsByTagName('main')
    //main.append(trainer_card_c);
    root.append(trainer_card_c);
}

function add_pokemon(trainer, ul){
        
        const trainer_card_c = document.querySelector('.card')
        //const this_trainers_pokemons = trainer.pokemons;
        //const 
        fetch(POKEMONS_URL,{
            method: 'post',
            headers: {
                'Content_Type': 'application/json'
            },
            body: JSON.stringify({
                "trainer_id": trainer.id
            })
            })
            .then(res => res.json())
            .then(function(pokemon){
                if(trainer.pokemons.length<6){
                    console.log(pokemon);
                    //trainer.pokemons.push(pokemon);
                    //trainer_card_c.append(pokemon);

                    
                    ul.append(renderPokemonListItem(pokemon));
                }
                else{
                    alert("Pokemons List is full! You cannot add further.")
                }
            })        
        }
 function renderPokemonListItem(pokemon){
    const li = document.createElement('li');
    li.innerText = pokemon.nickname;
    li.value = pokemon.nickname;

    const release = document.createElement('BUTTON');
    release.className = "release";
    release.innerText = "Release";
    release.setAttribute("data-pokemon-id",pokemon.id);
    li.append(release);
    return li;
 }