const getGeocode = require("./getGeocode.js")
const getForecast = require("./getForecast.js")

const getAddressForecast = (address, callback) => {
    getGeocode(address, ({ error, data: { latitude, longitude, place_name } = {} }) => {
        if (error) {
            callback({error})
        } else {
            getForecast(latitude, longitude, ({ error, data }) => {
                if (error) {
                    callback({error})
                } else {
                    callback({
                        data: {
                            address: "The latitude and longitude from \'"+place_name+"\' is "+latitude+','+longitude,
                            summary_message: "Gonna be "+data.today.summary,
                            degrees_message: "And it\'s currently "+data.degrees+" degrees out, with "+data.today.temperatureHigh+" high and "+data.today.temperatureLow+" low. There is a "
                                +data.precip_probability*100+"% chance of rain",
                        }
                    })
                }
            })
        }
    }) 
}
module.exports = getAddressForecast