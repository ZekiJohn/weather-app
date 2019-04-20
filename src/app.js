const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geoCode.js')
const app = express()
const port = process.env.PORT || 3000
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialsDir)

//setup static directory 
app.use(express.static(publicDirectoryPath))

//app.get('', (req, res) => {  first argument is an object which contains information about incoming request, second argument is what we are going to send back to the requester
//     res.send('<h1>Hello Express!</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Zack John',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Zack John',
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        if(error){
            return res.send({
                error: error,
            })
        }
        forecast(latitude, longitude, (error, forecastDdata) => {
            if(error){
                return res.send({
                    error: "Error:- "+error,
                })
            }
            res.send({
                latitude: latitude,
                longitude: longitude,
                location: location,
                forecast: forecastDdata
            })
        })
    })
})




app.get('/product', (req, res) => {
    console.log(req.query)
    res.send({
        product: []
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Zack John',
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page You are looking cannot be found!'
    })
})

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: '58 raind',
//         latitude: '42.5876',
//         longitude: '98.5844',
//     })
// })

app.listen(port, () => {
    console.log('Server is up on port '+port)
})