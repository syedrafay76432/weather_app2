const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=e6c866aa5c124e1595364154222306&q=' + latitude + ',' + longitude+'&aqi=no'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.condition.text +' and temperature is '+body.current.temp_c+ ' degress out.')
        }
    })
}

module.exports = forecast