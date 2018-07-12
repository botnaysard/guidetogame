const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://mark:sawyerD0g@ds151070.mlab.com:51070/gtgevents', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 80, () => {
    console.log('listening on 80')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

// display events

app.get('/', (req, res) => {
  var mysort = { event: 1 };
  db.collection('events').find().sort(mysort).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {events: result})
  })
})

// add events

app.post('/events', (req, res) => {
  db.collection('events').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('event saved to database')
    res.redirect('/')
  })
})

// delete events 

app.delete('/events', (req, res) => {
  db.collection('events').findOneAndDelete({event: req.body.event}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('event deleted')
  })
})



/* code block written in plain JS

app.get('/', function (request, response){
	res.send('Fuck yeah!')
})

*/

/* same code written with ES6

app.get('/', (req, res) => {
	res.send('Fuck yeah!')
})

*/

/* send a file instead

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

*/