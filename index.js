// ------------
// Quick notes on async/promises and JavaScripts fetch API.
// Whenever JavaScript uses fetch in order to pull data from an external API, it makes
// what is called a promise, which is what represents the state of completion or failure
// within an asynchronous operation. JavaScript is a synchronous language, which means
// the language only reads only one line at a time. To get around this async functions
// are used, such as fetch, which passes the code into the browser where the code 
// awaits one of its promised states while JavaScript continues to run.
// Using async functions is useful when so the page wont freeze and wait when loading contents on the page

// Basically, fetch() is a JavaScript native webAPI that is asynchronous and will return data
// in the form of a promise. Fetch uses a response object which holds the data returned from
// the API you're calling, then sends a request which returns a promise. When that request
// is complete it's resolved to the response object, if the request fails, the promise
// is 'rejected'.
// ------------

// containers
const newCharacterContainer = document.getElementsByClassName('new-character-container')
const createCharacterContainer = document.getElementsByClassName('create-character-container')

// dropdowns
const raceDropdown = document.querySelector('select#race')
const alignmentDropdown = document.querySelector('select#alignment')
const classDropdown = document.querySelector('select#class')
const backgroundDropdown = document.querySelector('select#background')

// description boxes
const classDescription = document.getElementById('class-description')
const backgroundDescription = document.getElementById('background-description')

// buttons
const newCharacterBtn = document.getElementById('new-character-button')
const createCharacterBtn = document.querySelector('input.submit')

// ability point bonuses
let str = 0;
let con = 0;
let dex = 0;
let int = 0;
let wis = 0;
let cha = 0;

// new character object
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

// ------------
// Refactored:
// Any function using fetch() was given a async declaration because they're all returning promises
// The logic being made in each fetch request was mitigated into in own callback function and passing
// the data from the returned promise as an argument.
// ------------

// ------------
// Refactored:
// the fetchCharacterData() is now invoked after the fetch call
async function deleteCharacter(index) {
    console.log("..... deleting character data")
    fetch(`http://localhost:3000/characters/${index}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
    // refetches character data once an item has been deleted off json-server
    fetchCharacterData();
}
// ------------


// ------------
// Refactored:
// This new function serves the purpose of taking in json data
// then creating elements in the DOM which is appended to the character screen
// that displays a card for each character that exists
function createCharacterData(data) {
    const characterCard = document.querySelector('div.characterCards');
    characterCard.innerHTML = '';
    // check if data exists
    if(data[0]){
        // if so iterate through each data object
        // create new variables and assign to parsed value of data
        data.forEach(data => {
            const characterName = JSON.parse(JSON.stringify(data.name));
            const characterClass = JSON.parse(JSON.stringify(data.playerClass))
            const characterLevel = JSON.parse(JSON.stringify(parseInt(data.level)))
            const characterRace = JSON.parse(JSON.stringify(data.playerRace))
            const characterBackground = JSON.parse(JSON.stringify(data.playerBackground))
            const characterAlignment = JSON.parse(JSON.stringify(data.playerAlignment))
            const strength = JSON.parse(JSON.stringify(data.abilities.strength))
            const constitution = JSON.parse(JSON.stringify(data.abilities.constitution))
            const dexterity = JSON.parse(JSON.stringify(data.abilities.dexterity))
            const intelligence = JSON.parse(JSON.stringify(data.abilities.intelligence))
            const wisdom = JSON.parse(JSON.stringify(data.abilities.wisdom))
            const charisma = JSON.parse(JSON.stringify(data.abilities.charisma))

            // create the character card with delete buttons
            const newCharacterCard = document.createElement('div');
            const deleteButton = document.createElement('button')

            // set attributes of card/buttons and append to the DOM
            newCharacterCard.setAttribute('class', 'newCharacterCard');
            deleteButton.setAttribute('id', 'delete-btn')
            deleteButton.setAttribute('class', data.id)
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
        })
    }

    // delete buttons event listeners
    const deleteCharacterBtn = document.querySelectorAll('button#delete-btn')
    const allCharacters = document.querySelectorAll('div.newCharacterCard')
    for(let i=0;i<allCharacters.length;i++){
        deleteCharacterBtn[i].addEventListener('click', (e) => {
            e.preventDefault();
            deleteCharacter(data[i].id);
        })
        deleteCharacterBtn[i].addEventListener("mouseover", setHoverColor);
        deleteCharacterBtn[i].addEventListener("mouseout", setNormalColor);
    }
}
// makes a promise, when resolved, it fetches existing character data from json-server
// then passes that data into a new function which handles the logic used to assign
// values into each key of the newCharacter object
async function fetchCharacterData() {
    console.log("..... fetching character data")
    return fetch(`http://localhost:3000/characters`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(data => {
        if(data) {
            createCharacterData(data)
        }
    })
}
// ------------


// ------------
// Refactored:
// This function was created to be seperated from the function that assigns
// all new values to the newCharacter object
// An object is called into this function, then POST request is made
// sending the value of the object into json-server
async function sendNewCharacterData(character) {
    fetch(`http://localhost:3000/characters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body : JSON.stringify(character),
    }) 
    // response.json() reads the promise to completion
    // which returns the result of parsing the body text
    // as JSON
    .then(response => response.json());
}
// the logic containing POST request is cut and pasted into its own function
// that function is invoked in this function with the newCharacter object being
// passed into it as an argument
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
    // assigning elements to new character object
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

    // POST request sends newCharacter data to server
    sendNewCharacterData(newCharacter);

    // refetch the new set of data that was just created
    fetchCharacterData();
}
// ------------


// ------------
// these functions are invoked by the async functions below
// the promised data is passed into these functions as arguments
// and will create DOM elements that will display useful descriptions
// in order to help the user make choices based off what's appended
// on the character creator screen
function createRaceDescription(data) {
    const desc = document.createElement('div')
    const abilityPoints = document.createElement('div')
    const raceDescription = document.getElementById('race-description');
    raceDescription.innerHTML = ''
    const bonuses = data.ability_bonuses 
    // debugger                       
    // bonuses.forEach(element => 
    //     console.log('bonus: ' +
    //         element.ability_score.index + ' ' +
    //         element.bonus
    // ));
    // bonus values reset
    str = 0;
    con = 0;
    dex = 0;
    int = 0;
    wis = 0;
    cha = 0;
    // iterate through each ability score element then assigning it's value
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

}
function createClassDescription(data) {
    const classDescription = document.getElementById('class-description');
    classDescription.innerHTML = `<div class="desc">
                                    <h2>${data.name}</h2>
                                    <p>Hit Die: ${data.hit_die}</p>
                                 </div>`;
}
function createAlignmentDescription(data) {
    const alignmentDescription = document.getElementById('alignment-description');
    alignmentDescription.innerHTML = `<div class="desc">
                                        <h2>${data.name}</h2>
                                        <p>Alignment: ${data.desc}</p>
                                      </div>`;
}

// these async functions fetch data from the dnd5api
// resolved data is passed into functions that are
// used to manipulate the DOM
async function fetchAlignmentDescription() {
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
        createAlignmentDescription(data);
    });
}
async function fetchClassDescription() {
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
        createClassDescription(data);
    });
}
async function fetchRaceDescription() {
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
        createRaceDescription(data);
    });
}
// ------------


// changes button color on mouse over and resets on mouse out
function setHoverColor() {
    this.style.background = "rgb(200, 100, 73)";
}
function setNormalColor() {
    this.style.background = "";
}

// on document load
document.addEventListener("DOMContentLoaded", () => {

    // fetches any existing character data from my json-server
    fetchCharacterData();


    //button 'mouseover' 'mouseout' event listeners
    newCharacterBtn.addEventListener("mouseover", setHoverColor);
    newCharacterBtn.addEventListener("mouseout", setNormalColor);
    createCharacterBtn.addEventListener("mouseover", setHoverColor);
    createCharacterBtn.addEventListener("mouseout", setNormalColor);

    // button 'click' event listeners
    createCharacterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setNewCharacterData();
        newCharacterContainer[0].style.display = "flex";
        createCharacterContainer[0].style.display = 'none'
    })
    newCharacterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        newCharacterContainer[0].style.display = "none";
        createCharacterContainer[0].style.display = 'flex'
        fetchRaceDescription();
        fetchClassDescription();
        fetchAlignmentDescription();

    })

    // dropdown 'change' event listeners
    // calls functions which fetches data from the dnd5api
    raceDropdown.addEventListener('change', (e) => {
        fetchRaceDescription();
    })
    classDropdown.addEventListener('change', (e) => {
        fetchClassDescription();
    })
    alignmentDropdown.addEventListener('change', (e) => {
        fetchAlignmentDescription();
    })
})