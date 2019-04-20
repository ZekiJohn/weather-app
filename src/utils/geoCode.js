const request = require('request')

const geoCode  = (address, callback) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiemFja2pvaG4iLCJhIjoiY2p1OW1uYTV0MWRlNzN6cXJ2ODd0Y3djbSJ9.xQs1bteGAjG6gtt8TYWtLQ'
    request({url: mapUrl, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to Connect to location service.', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find loaction', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geoCode