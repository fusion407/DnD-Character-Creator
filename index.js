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

function setNewCharacterData() {
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

    //create object with above data
    //pass into function that handles json server
    //display new character screen and hide new character container
    //create character card which appends to new new character container
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
            console.log(
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
                                    <li>Charisma: +${cha}</li>`
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