const raceDropdown = document.querySelector('select#race')
const alignmentDropdown = document.querySelector('select#alignment')
const classDropdown = document.querySelector('select#class')
const backgroundDropdown = document.querySelector('select#background')


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
async function changeRaceDescription() {
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
        // raceDiv.innerHTML = 'hello world'
        raceDescription.appendChild(raceDiv);
        raceDescription.innerHTML = `<div>
                                        <h2>${data.name}</h2>
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
        classDescription.innerHTML = `<div>
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
    console.log("called class description function")
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
        alignmentDescription.innerHTML = `<div>
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
        console.log('i work')
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