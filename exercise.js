const request = require('superagent')
const colors = require('colors')

setInterval(() => {
  makeSillyRequest('localhost:3000') // nodejs app
}, 800)

setInterval(() => {
  makeSillyRequest('localhost:5002') // dotnet core app
}, 1400)

setInterval(() => {
  makeSillyRequest('localhost:1337/golang') // Go app
}, 400)

function makeSillyRequest (url) {
  request.get(url).end(function (err, res) {
    if (err) {
      console.log(err.toString().red)
    } else {
      console.log(
                `${url} returned a ${res.status} with text: ${res.text} ${new Date()
              .toTimeString()
              .split(' ')[0]} `.green
            )
    }
  })
}
