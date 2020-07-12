const request = require('request')
const weatherDetails = (city,callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=df4d9fcd15cf1be76f0c86efcafb54b4&units=metric`
  request({url,json:true},(error,res) => {
    if(error) {
      callback('Unable to connect',undefined)
    }
    else if(res.error) {
      callback ('Unable to find the weather',undefined)
    }
    else {
      callback(undefined,{
        temperature : res.body.main.temp,
        feelslike : res.body.main.feels_like,
        description : res.body.weather[0].description   
      })
    }
  })
}
module.exports = weatherDetails