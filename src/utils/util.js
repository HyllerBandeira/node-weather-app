const chalk = require('chalk')

const api_keys = {
    mapbox_key: "pk.eyJ1IjoiaHlsbGVyYmFuZGVpcmEiLCJhIjoiY2p2cGR1aG84MjhrZTQ5dWkxZnl3aGhsNyJ9.vqbri0gvhVmLLCrRAqVgTQ",
    darksky_key: "ca8c2d935adc8aadec5f02026a39711f",
}

const showErrorMessage = (message) => {
    console.log(chalk.bgRed("Error:")+" "+message)
}

const showSuccessMessage = (message) => {
    console.log(chalk.bgGreen("Success:")+" "+message)
}

const showWarningMessage = (message) => {
    console.log(chalk.yellow.inverse("Warning:")+" "+message)
}

module.exports = {
    api_keys,
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
}