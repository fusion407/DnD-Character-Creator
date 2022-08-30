// dropdowns
const raceDropdown = document.querySelector('select#race')
const alignmentDropdown = document.querySelector('select#alignment')
const classDropdown = document.querySelector('select#class')
const backgroundDropdown = document.querySelector('select#background')

// description boxes
const classDescription = document.getElementById('class-description')
const backgroundDescription = document.getElementById('background-description')

// ability point bonuses
let str = 0;
let con = 0;
let dex = 0;
let int = 0;
let wis = 0;
let cha = 0;

// character object
const newCharacter = {
    id : '',
    name : '',
    level : 0,
    playerRace : '',
    playerClass : '',
    playerBackground : '',
    playerAlignment : '',
    abilities : {
        strength : 0,
        constitution : 0,
        dexterity : 0,
        intelligence : 0,
        wisdom : 0,
        charisma : 0
    }
}


function deleteCharacter(index) {
    console.log("..... deleting character data")
    return fetch(`http://localhost:3000/characters/${index}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        fetchCharacterData();
    })
}
function fetchCharacterData() {
    console.log("..... fetching character data")
    const characterCard = document.querySelector('div.characterCards');
    characterCard.innerHTML = '';
    return fetch(`http://localhost:3000/characters`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(data => {
        const base = data[0];
        const abilityPoints = data.abilities;
        if (base) {
            for(let i=0;i<data.length;i++) {
                const characterName = JSON.parse(JSON.stringify(data[i].name));
                const characterClass = JSON.parse(JSON.stringify(data[i].playerClass))
                const characterLevel = JSON.parse(JSON.stringify(parseInt(data[i].level)))
                const characterRace = JSON.parse(JSON.stringify(data[i].playerRace))
                const characterBackground = JSON.parse(JSON.stringify(data[i].playerBackground))
                const characterAlignment = JSON.parse(JSON.stringify(data[i].playerAlignment))
                const strength = JSON.parse(JSON.stringify(data[i].abilities.strength))
                const constitution = JSON.parse(JSON.stringify(data[i].abilities.constitution))
                const dexterity = JSON.parse(JSON.stringify(data[i].abilities.dexterity))
                const intelligence = JSON.parse(JSON.stringify(data[i].abilities.intelligence))
                const wisdom = JSON.parse(JSON.stringify(data[i].abilities.wisdom))
                const charisma = JSON.parse(JSON.stringify(data[i].abilities.charisma))
                const newCharacterCard = document.createElement('div');
                const deleteButton = document.createElement('button')
                newCharacterCard.setAttribute('class', 'newCharacterCard');
                deleteButton.setAttribute('id', 'delete-btn')
                deleteButton.setAttribute('class', `${i}`)
                deleteButton.innerText = 'Delete';
                newCharacterCard.innerHTML = `<h2>${characterName}</h2>
                                              <h2> Lvl: ${characterLevel}</h2>
                                              <h3>${characterRace} - ${characterClass} - ${characterBackground}</h3>
                                              <h3>${characterAlignment}</h3>
                                              <div class="abilitiesOnCard">
	                                            <div class="item item--1">Str: ${strength}</div>
	                                            <div class="item item--2">Con: ${constitution}</div>
	                                            <div class="item item--3">Dex: ${dexterity}</div>
	                                            <div class="item item--4">Int: ${intelligence}</div>
	                                            <div class="item item--5">Wis: ${wisdom}</div>
	                                            <div class="item item--6">Cha: ${charisma}</div>
                                              </div>`
                characterCard.appendChild(newCharacterCard);
                newCharacterCard.appendChild(deleteButton)

            } 
                
        }
        const deleteCharacterBtn = document.querySelectorAll('button#delete-btn')
        const allCharacters = document.querySelectorAll('div.newCharacterCard')

        for(let i=0;i<allCharacters.length;i++){
            deleteCharacterBtn[i].addEventListener('click', (e) => {
                e.preventDefault();
                const dataID = JSON.parse(JSON.stringify(data[i].id))
                console.log("clicked delete button: "+ i)
                deleteCharacter(dataID);
            })
        }

    })
}

function setNewCharacterData() {
    console.log('..... creating character')

    //name
    const name = document.querySelector('input#name').value
    console.log('name: ' + name)

    //level
    const level = parseInt(document.querySelector('input#level').value);
    console.log('level: ' + level)
    
    //class
    const playerRace = document.querySelector('select#race').value;
    console.log('race: ' + playerRace)

    //background
    const playerClass = document.querySelector('select#class').value;
    console.log('class: ' + playerClass)

    //background
    const playerBackground = document.querySelector('select#background').value;
    console.log('background: ' + playerBackground)

    //alignment
    const playerAlignment = document.querySelector('select#alignment').value;
    console.log('alignment: ' + playerAlignment)

    //abilities
    const strength = parseInt(document.querySelector('input#strength.action-points').value) + str;
    console.log('str: ' + strength);
    const constitution = parseInt(document.querySelector('input#constitution.action-points').value) + con;
    console.log('con: ' + constitution);
    const dexterity = parseInt(document.querySelector('input#dexterity.action-points').value) + dex;
    console.log('dex: ' + dexterity);
    const intelligence = parseInt(document.querySelector('input#intelligence.action-points').value) + int;
    console.log('int: ' + intelligence);
    const wisdom = parseInt(document.querySelector('input#wisdom.action-points').value) + wis;
    console.log('wis: ' + wisdom);
    const charisma = parseInt(document.querySelector('input#charisma.action-points').value) + cha;
    console.log('cha: ' + charisma);

    // assigning elements to character object
    newCharacter.name = name;
    newCharacter.level = level;
    newCharacter.playerRace = playerRace;
    newCharacter.playerClass = playerClass;
    newCharacter.playerBackground = playerBackground
    newCharacter.playerAlignment = playerAlignment;
    newCharacter.abilities.strength = strength;
    newCharacter.abilities.constitution = constitution;
    newCharacter.abilities.dexterity = dexterity;
    newCharacter.abilities.intelligence = intelligence;
    newCharacter.abilities.wisdom = wisdom;
    newCharacter.abilities.charisma = charisma;
    console.log('character : ' + JSON.stringify(newCharacter))

    // making post request sending newCharacter data to server
    fetch(`http://localhost:3000/characters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body : JSON.stringify(newCharacter),
    }) 
    .then(response => response.json());

    fetchCharacterData();

    
    //create character card which appends to new new character container
    //reset html element values from the create new character container
}

function changeRaceDescription() {
    console.log("called race description function")
    fetch(`https://www.dnd5eapi.co/api/races/${raceDropdown.value.toLowerCase()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(data => {
        const desc = document.createElement('div')
        const abilityPoints = document.createElement('div')
        const raceDescription = document.getElementById('race-description');
        raceDescription.innerHTML = ''
        const bonuses = data.ability_bonuses
             // debug                            
        bonuses.forEach(element => 
            console.log('bonus: ' +
                element.ability_score.index + ' ' +
                element.bonus
        ));
        // making sure bonus values reset
        str = 0;
        con = 0;
        dex = 0;
        int = 0;
        wis = 0;
        cha = 0;
        // iterate through each ability score element then assigning it's value
        // to a global variable
        bonuses.forEach(element => {
            if(element.ability_score.index === 'str') {
                str = element.bonus;
            }
            if(element.ability_score.index === 'con') {
                con = element.bonus;
            }
            if(element.ability_score.index === 'dex') {
                dex = element.bonus;
            }
            if(element.ability_score.index === 'int') {
                int = element.bonus;
            }
            if(element.ability_score.index === 'wis') {
                wis = element.bonus;
            }
            if(element.ability_score.index === 'cha') {
                cha = element.bonus;
            }
        });              

        desc.innerHTML = `<h2>${data.name}</h2>
                          <p>Speed: ${data.speed}</p>
                          <p>Languages: ${data.language_desc}</p>`;
        abilityPoints.innerHTML = `<p>Racial Bonuses:</p>
                                    <li>Strength: +${str}</li>
                                    <li>Constitution: +${con}</li>
                                    <li>Dexterity: +${dex}</li>
                                    <li>Intelligence: +${int}</li>
                                    <li>Wisdom: +${wis}</li>
                                    <li>Charisma: +${cha}</li>
                                    `
        desc.setAttribute('class', 'desc')
        raceDescription.appendChild(desc);
        desc.appendChild(abilityPoints)

    });
}
function changeClassDescription() {
    console.log("called class description function")
    fetch(`https://www.dnd5eapi.co/api/classes/${classDropdown.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(data => {
        const classDescription = document.getElementById('class-description');
        classDescription.innerHTML = `<div class="desc">
                                        <h2>${data.name}</h2>
                                        <p>Hit Die: ${data.hit_die}</p>
                                     </div>`;
    });
}

function changeAlignmentDescription() {
    console.log("called alignment description function")
    fetch(`https://www.dnd5eapi.co/api/alignments/${alignmentDropdown.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(data => {
        const alignmentDescription = document.getElementById('alignment-description');
        alignmentDescription.innerHTML = `<div class="desc">
                                            <h2>${data.name}</h2>
                                            <p>Alignment: ${data.desc}</p>
                                          </div>`;
    
    });
}
document.addEventListener("DOMContentLoaded", () => {
    // containers
    const newCharacterContainer = document.getElementsByClassName('new-character-container')
    const createCharacterContainer = document.getElementsByClassName('create-character-container')

    // buttons
    const newCharacterBtn = document.getElementById('new-character-button')
    const createCharacterBtn = document.querySelector('input.submit')

    
    fetchCharacterData();

    // hides new character container and displays create character container
    newCharacterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newCharacterContainer[0].style.display = "none";
        createCharacterContainer[0].style.display = 'flex'
        changeRaceDescription();
        changeClassDescription();
        changeAlignmentDescription();

    })
    // create character button
    createCharacterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setNewCharacterData();
        newCharacterContainer[0].style.display = "flex";
        createCharacterContainer[0].style.display = 'none'
    })

    // for (let i = 0; i <= allCharacters.length; i++) {
    //     let button = deleteCharacterBtn[i];
    //     console.log('delete called')
    //     button[i].addEventListener ("click", function() {
    //       console.log('it worked');
    //       deleteCharacter(i);
    //     });
    //   }

    // dropdown event listeners
    raceDropdown.addEventListener('change', (e) => {
        changeRaceDescription();
    })
    classDropdown.addEventListener('change', (e) => {
        changeClassDescription();
    })
    alignmentDropdown.addEventListener('change', (e) => {
        changeAlignmentDescription();
    })
})