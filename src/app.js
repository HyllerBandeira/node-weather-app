// module to serve the application
const express = require("express")
// module to work with path manipulation
const path = require("path")
// module to work with handlebars template
const hbs = require("hbs")

// external file to resolve forecast from given address
const getAddressForecast = require("./utils/getAddressForecast.js")


// express OBJ used to serve the application
const app = express()
const port = process.env.PORT || 3000

// Paths to express config
const public_directory = path.join(__dirname, "../public")
const views_directory = path.join(__dirname, "../templates/views")
const partials_directory = path.join(__dirname, '../templates/partials')

// Setup to Handlebars engine and views location
app.set('views', views_directory)
app.set('view engine', '.hbs')
hbs.registerPartials(partials_directory)

// Setup static directory to serve 
app.use(express.static(public_directory))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        content: "Use this site to forecast your weather",
        author: "Hyller Bandeira"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        content: "Some about content",
        author: "Hyller Bandeira"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        content: "Some help content",
        author: "Hyller Bandeira"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: {
                error: 'true',
                message: 'You must provide an address'
            }
        })
    }
    let {address} = req.query 
    
    getAddressForecast(address, ({error, data}) => {
        if (error) {
            return res.send({
                error: {
                    error: 'true',
                    message: error.message
                }
            })
        } else {
            return res.send({
                data
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'true',
            message: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error/404', {
        title: 'Error-404',
        errorMessage: 'Help article not found',
        author: "Hyller Bandeira"
    })
})

app.get('*', (req, res) => {
    res.render('error/404', {
        title: 'Error-404',
        errorMessage: 'Page not found',
        author: "Hyller Bandeira"
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})