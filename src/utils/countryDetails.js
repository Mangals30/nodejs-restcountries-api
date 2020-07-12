const request = require('request')
const data = []
const countryDetails = (country,callback) => {
  const url = `https://restcountries.eu/rest/v2/name/${country}`
  request({url,json:true},(error,res) => {
    if(error) {
      callback('Unable to connect', undefined)
    }
    
    else if(Array.isArray(res.body)){
      for(const element of res.body) {
        data.push({country : element.name, capital : element.capital})
      }
      callback(undefined,data)
    }
    else {
      callback('Not a proper country name',undefined)
    }
  })
}
module.exports = countryDetails