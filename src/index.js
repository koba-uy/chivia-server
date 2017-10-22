const bodyParser = require('body-parser')
const express = require('express')
const fs = require('fs')
const path = require('path')
const Chivia = require('./chivia')

let app = express()
let chivia = new Chivia()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Chiviá')
})

app.get('/route', (req, res) => {
    let from = req.query.from.split(',').map(i => +i)
    let to = req.query.to.split(',').map(i => +i)

    chivia
        .easiestRoute(from, to)
        .then(route => {
            res.send(route)
        })
        .catch(err => {
            res.status(501).send(err)
        })
})

app.get('/stand', (req, res) => {
    let stands = fs.readFileSync(path.join(__dirname, '../data/stands/uruguay.json'))
    res.send(JSON.parse(stands))
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})