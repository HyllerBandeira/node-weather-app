const chalk = require('chalk')

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
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
}