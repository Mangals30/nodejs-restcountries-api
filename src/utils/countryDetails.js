const request = require('request')
const data = []
const countryDetails = (country,callback) => {
  const url = `https://restcountries.eu/rest/v2/name/${country}`
  request({url,json:true},(error,res) => {
    if(error) {
      callback('Unable to connect', undefined)
    }
    else if(res.error) {
      callback('Not a country name!')
    }
    else {
      for(const element of res.body) {
        data.push({country : element.name, capital : element.capital})
      }
    }
    callback(undefined,data)
  })
}
module.exports = countryDetails