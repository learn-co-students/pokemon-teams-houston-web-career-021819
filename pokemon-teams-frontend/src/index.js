const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

fetch(TRAINERS_URL)
    .then(function(response){
        return response.json();
    })
    .then(function(trainers_json){      
        trainers_json.forEach(function(trainer){
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
        add_pokemon(trainer);
    })

    var ul = document.createElement('ul');
    const pokemons_array = trainer.pokemons;
    pokemons_array.forEach(function(pokemon){
        const li = document.createElement('li');
        li.innerText = pokemon.nickname;
        li.value = pokemon.nickname;
        const release = document.createElement('BUTTON');
        release.className = "release";
        release.value = "Release";
        release.setAttribute("data-pokemon-id",pokemon.id);
        li.append(release);
        ul.append(li);

        release.addEventListener('click', function(){
            ul.removeChild(li);
        })
    })
    trainer_card_c.append(ul);
    //const main  = document.getElementsByTagName('main')
    //main.append(trainer_card_c);
    document.body.append(trainer_card_c);
}

function add_pokemon(trainer){
        const trainer_card_c = document.querySelector('.card')
        //const this_trainers_pokemons = trainer.pokemons;
        //const 
        fetch(POKEMONS_URL,{
            method: 'post',
            headers: {
                'Content_Type': 'application/json'
            },
            body: JSON.stringify({
                "data-trainer-id": trainer.id
            })
            })
            .then(res => res.json())
            .then(function(pokemon){
                if(!trainer.pokemons.includes(pokemon) && (trainer.pokemons.length<6)){
                    console.log(pokemon);
                    trainer.pokemons.push(pokemon);
                }
            })        
        }
 