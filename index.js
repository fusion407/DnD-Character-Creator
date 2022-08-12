
document.addEventListener("DOMContentLoaded", () => {
    const newCharacterContainer = document.getElementsByClassName('new-character-container')
    const createCharacterContainer = document.getElementsByClassName('create-character-container')
    const newCharacterBtn = document.getElementById('new-character-button')

    newCharacterBtn.addEventListener('click', () => {
        console.log('i work')
        newCharacterContainer[0].style.display = "none";
        createCharacterContainer[0].style.display = 'flex'
    })

})