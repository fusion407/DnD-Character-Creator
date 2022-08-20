const raceDropdown = document.querySelector('select#race')
const alignmentDropdown = document.querySelector('select#alignment')
const classDropdown = document.querySelector('select#class')
const backgroundDropdown = document.querySelector('select#background')

// ability point bonuses
let str = 0;
let con = 0;
let dex = 0;
let int = 0;
let wis = 0;
let cha = 0;


// work in progress
// function getSubRace(race) {
//     console.log("called subrace description function")
//     if(race === raceDropdown.value) {
//         console.log("fetching subrace...")
//         fetch(`https://www.dnd5eapi.co/api/races/${raceDropdown.value}/subraces`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json'
//             }
//         }) 
//         .then(response => response.json())
//         .then(data => {
//             a = {data: []}
//             a.data.map(el => (
//                 console.log(el[results].name[0])
//             ))
//             console.log(data.count)
//         })
//     }
//     else {
//         return;
//     }
// }
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
        const raceDescription = document.getElementById('race-description');
        const raceDiv = document.createElement('h2')
        const bonuses = data.ability_bonuses

             // debug                            
        bonuses.forEach(element => 
            console.log(
                element.ability_score.index + ' ' +
                element.bonus
            
        ));
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
        // raceDiv.innerHTML = 'hello world'
        raceDescription.appendChild(raceDiv);
        raceDescription.innerHTML = `<div class="desc">
                                        <h2>${data.name}</h2>
                                        <p>Spped: ${data.speed}</p>
                                        <p>Languages: ${data.language_desc}</p>
                                     </div>`;
 
        // getSubRace(data.name);
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



// API currently only supports acolyte so background description
// returns its own value without fetching data
// function changeBackgroundDescription() {
//     console.log("called background description function")
//     const backgroundDescription = document.getElementById('background-description');
//     backgroundDescription.innerHTML = `<div>
//                                             <h2>${backgroundDropdown.value}</h2>
//                                             <p>API not available</p>
//                                         </div>`;
//     fetch(`https://www.dnd5eapi.co/api/backgrounds/${backgroundDropdown.value}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json'
//         }
//     }) 
//     .then(response => response.json())
//     .then(data => {
//         const backgroundDescription = document.getElementById('background-description');
//         backgroundDescription.innerHTML = data.name;
//     });
// }



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
    
    // description boxes
    const classDescription = document.getElementById('class-description')
    const backgroundDescription = document.getElementById('background-description')

    // hides new character container and displays create character container
    newCharacterBtn.addEventListener('click', () => {
        newCharacterContainer[0].style.display = "none";
        createCharacterContainer[0].style.display = 'flex'
        changeRaceDescription();
        changeClassDescription();
        changeAlignmentDescription();
        // changeBackgroundDescription();
    })

    // dropdown event listeners
    raceDropdown.addEventListener('change', (e) => {
        changeRaceDescription();
    })
    classDropdown.addEventListener('change', (e) => {
        changeClassDescription();
    })
    // backgroundDropdown.addEventListener('change', (e) => {
    //     changeBackgroundDescription();
    // })
    alignmentDropdown.addEventListener('change', (e) => {
        changeAlignmentDescription();
    })
})