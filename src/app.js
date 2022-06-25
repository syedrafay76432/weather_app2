const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Rafay Zain"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Rafay Zain"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Rafay Zain"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: "Location is not provided" })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {

                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error
                    })
                }
                res.send({
                    location,
                    forecastData
                }) 
            })
        })
    }

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        error: "help article not found"
        , name: 'Syed Rafay'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: "404 error. page not found"
        , name: 'Syed Rafay'
    })
})

app.listen(3000, () => {
    console.log("server is up on localhost 3000")
})