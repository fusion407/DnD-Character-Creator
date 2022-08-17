const raceDropdown = document.querySelector('select#race')
const classDropdown = document.querySelector('select#class')
const backgroundDropdown = document.querySelector('select#background')



function changeRaceDescription() {
    console.log("called race description function")
    fetch(`https://www.dnd5eapi.co/api/races/${raceDropdown.value}`, {
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
                                        <p>Alignment: ${data.alignment}</p>
                                     </div>`;
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
// returns only its own value
function changeBackgroundDescription() {
    console.log("called background description function")
    const backgroundDescription = document.getElementById('background-description');
    backgroundDescription.innerHTML = `<div>
                                            <h2>${backgroundDropdown.value}</h2>
                                            <p>API not available</p>
                                        </div>`;



    // fetch(`https://www.dnd5eapi.co/api/backgrounds/${backgroundDropdown.value}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json'
    //     }
    // }) 
    // .then(response => response.json())
    // .then(data => {
    //     const backgroundDescription = document.getElementById('background-description');
    //     backgroundDescription.innerHTML = data.name;
    // });
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
    // drop down select
    // hides new character container and displays create character container
    newCharacterBtn.addEventListener('click', () => {
        console.log('i work')
        newCharacterContainer[0].style.display = "none";
        createCharacterContainer[0].style.display = 'flex'
        changeRaceDescription();
        changeClassDescription();
        changeBackgroundDescription();
    })

    // dropdown event listeners
    raceDropdown.addEventListener('change', (e) => {
        e.preventDefault();
        changeRaceDescription();
    })
    classDropdown.addEventListener('change', (e) => {
        changeClassDescription();
    })
    backgroundDropdown.addEventListener('change', (e) => {
        changeBackgroundDescription();
    })
})