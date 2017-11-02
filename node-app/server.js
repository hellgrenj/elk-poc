const express = require('express')
const app = express()
const bunyan = require('bunyan')
const bunyantcp = require('bunyan-logstash-tcp')

const logger = bunyan.createLogger({
  name: 'example',
  streams: [
    {
      level: 'debug',
      stream: process.stdout
    },
    {
      level: 'debug',
      type: 'raw',
      stream: bunyantcp.createStream({
        host: 'elk',
        port: 9999
      })
    }
  ],
  level: 'debug'
})

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json')
  next()
})

app.get('/', function (req, res) {
  let logMessages = [
    'Allo Allo',
    'Well, I wouldn’t say I’ve been MISSING it, Bob',
    "He said they've already got one"
  ]
  let message = logMessages[Math.floor(Math.random() * logMessages.length)]
  logger.debug(message)
  res.json({
    response: 'hello world from node'
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
