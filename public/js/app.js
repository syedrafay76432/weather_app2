console.log("client site javascript is loaded")

const weatherForm =  document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message_1')
const message_2 = document.querySelector('#message_2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    message_1.textContent = 'loading...'
    message_2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message_1.textContent = (data.error)
            } else {
                message_1.textContent = ('')
                message_2.textContent = (data.forecastData)
            }
        })
    })
})