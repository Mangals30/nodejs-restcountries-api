const path = require('path')
const express = require('express')
const hbs = require('hbs')
const countryDetails = require('./utils/countryDetails')
const weatherDetails = require('./utils/weatherDetails')
const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDir))
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)
app.get('',(req,res)=> {
  res.render('index', {
    title : 'Country and Weather Information'
  })
})
app.get('/about',(req,res) => {
  res.render('about', {
    title: 'About the Project',
    contents : 
    'This a node.js project which receives the country and the weather information of any city the user enters.The apis used in this project are as below.'
  })
})
app.get('/country',(req,res) => {
  if(!req.query.country) {
    return res.send({
      error : 'You should specify a country!'
    })
  }
  countryDetails(req.query.country,(error,data) => {
    if(error) {
      return res.send({error})
    }
    const count= data.find(country => country.country.toLowerCase()== req.query.country.toLowerCase())
    if(!count) {
      return res.send('No match found')
    }
    weatherDetails(count.capital,(error,weather) => {
      if(error) {
        return res.send({error})
      }
      res.send({country : count.country,
      capital : count.capital,
      temperature : weather.temperature,
      feelslike: weather.feelslike,
      forecast:weather.description
  })
    })
  })
})
app.listen(port,()=> {
  console.log('server started at port', port)
})