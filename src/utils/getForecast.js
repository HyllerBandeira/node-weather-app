const request = require("request")
const util = require("./util.js")


const getForecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/"+util.api_keys.darksky_key+"/"+latitude+","+longitude+"?units=si"
    
    request({
        url,
        json: true,
    }, (error, { body }) => {
        if (error) {
            callback({
                error: {
                    message: "Unable to connect to weather server",
                    notify: "error"
                }
            })
        } else if (body.error) {
            callback({
                error: {
                    message: "Unable to find the location",
                    notify: "error"
                }
            })
        } else {
            let { currently, daily } = body
            let today = daily.data[0]
            let { temperature: degrees, precipProbability: precip_probability } = currently

            callback({
                data: {
                    today,
                    currently,
                    degrees,
                    precip_probability,
                }
            })
        }
    })
}

module.exports = getForecast