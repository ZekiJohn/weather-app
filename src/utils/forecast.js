const request = require('request')

const forecast = (latitude, lonigtude, callback) => {
    const url = 'https://api.darksky.net/forecast/2722745372f28f5e6591240880025f10/'+ latitude + ',' + lonigtude
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service.', undefined)
        }else if(body.error){
            callback('Unable to find given loaction.', undefined)
        }else{
            callback(undefined, body.hourly.data[0].summary + '. the Temprature is ' + body.currently.temperature + ' there is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports = forecast