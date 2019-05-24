const forecast_form = document.querySelector('form[id="forecast-form"]')
const address_input = forecast_form.querySelector('input[name="address"]')
const loading_message = document.querySelector('p[id="loading-message"]')
const forecast_message = document.querySelector('p[id="forecast-message"]')

forecast_form.addEventListener('submit', (event) => {
    event.preventDefault()

    loading_message.textContent = "Loading..."
    forecast_message.textContent = ""
    fetch('/weather?address='+address_input.value).then((res) => {
        res.json().then(({ error, data: { address, summary_message, degrees_message } = {} } = {}) => {
            if (error) {
                loading_message.textContent = ""
                forecast_message.textContent = error.message
            } else {
                loading_message.textContent = ""
                forecast_message.textContent = address+". "
                    +summary_message+" "+degrees_message
            }
        })
    })
})