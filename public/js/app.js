const input = document.querySelector('input')
const country = document.querySelector('#country')
const capital = document.querySelector('#capital')
const temperature = document.querySelector('#temperature')
const feelslike = document.querySelector('#feelslike')
const forecast = document.querySelector('#forecast')
const form = document.querySelector('form')

form.addEventListener('submit',(e) => {
  e.preventDefault()
  const searchInput = input.value
  country.textContent = 'Loading...'
  capital.textContent = ''
  temperature.textContent = ''
  forecast.textContent = ''
  fetch(`/country?country=${searchInput}`)
  .then((response) => {
    response.json()
    .then((data)=>{
     if(data.error) {
       country.textContent = data.error
     }
     else{
       country.textContent = `Country : ${data.country.toUpperCase()}`
       capital.textContent = `Capital : ${data.capital.toUpperCase()}`
       temperature.textContent = `Temperature : ${data.temperature}°C`
       feelslike.textContent = `Feels like : ${data.feelslike}°C`
       forecast.textContent = `Forecast : ${data.forecast.toUpperCase()}`
     }
    })
  })
})