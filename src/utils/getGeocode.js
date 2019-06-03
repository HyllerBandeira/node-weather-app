const request = require("request")
const util = require("./util.js")

const getGeocode = (search, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(search)+".json?access_token="+process.env.MAPBOX_API_KEY+"&limit=1"
    
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback({
                error: {
                    message: "Unable to connect to geocode server",
                    notify: "error"
                }
            })
        } else if (body.message === 'Not Authorized - Invalid Token') {
            callback({
                error: {
                    message: "Unable to connect to geocode server",
                    notify: "error"
                }
            })
        } else if (body.message === 'Not Found') {
            callback({
                error: {
                    message: "Location not found, try another search",
                    notify: "warning"
                }
            })
        } else if (body.features.length <= 0) {
            callback({
                error: {
                    message: "Location not found, try another search",
                    notify: "warning"
                }
            })
        } else {
            let {place_name, center} = body.features[0]
            
            callback({
                data : {
                    place_name,
                    latitude: center[1],
                    longitude: center[0],
                    message: "The latitude and longitude for \'"+place_name+"\' is "+center[1]+" and "+center[0]
                }
            })
        }
    })
}

module.exports = getGeocode