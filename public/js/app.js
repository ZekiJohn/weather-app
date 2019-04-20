

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const address = document.getElementById('location')
const description = document.getElementById('description')

const getWeather = (location) => {
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return address.innerHTML = 'Error:  ' + data.error
            }
            address.innerHTML = 'Location:  ' + data.location
            description.innerHTML = 'Forcast:  ' + data.forecast
        })
    })    
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    address.innerHTML = 'Loading...'
    getWeather(search.value)
})