require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

const cors = require('cors')
const Contact = require('./models/contact')

app.use(express.static('build'))
app.use(cors())

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

let contacts = [
  {
    'name': 'Berta Jackin',
    'number': '040-1632345',
    'id': 0
  },
  {
    'name': 'Bill Cage',
    'number': '045-752514',
    'id': 1
  },
  {
    'name': 'Michael Fatson',
    'number': '09-4562156',
    'id': 2
  },
  {
    'name': 'Hugh Fackman',
    'number': '04-7321193',
    'id': 3
  }
]

const info = {
  content: `Phonebook has info for ${Contact.length + 1} people`,
  date: new Date()
}

//GET INFO
app.get('/api/info', (req, res) => {
  res.send(info.content + '<br />' + info.date)
})

//GET ALL CONTACTS
app.get('/api/persons', (req, res) => {
  Contact.find({}).then(people => {
    //contacts = people
    res.json(people.map(contact => contact.toJSON()))
  })
})

//GET PERSON BY ID
app.get('/api/persons/:id', (req, res) => {
  Contact.findById(req.params.id).then(contact => {
    if(contact) {
      res.json(contact.toJSON())
    } else {
      res.status(204).end()
    }
  })
    .catch(error => next(error))
})

//UPDATE CONTACT
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }
  Contact.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedContact => {
      console.log(updatedContact.toJSON())
      res.json(updatedContact.toJSON())
    })
    .catch(error => next(error))
})

//ADD PERSON
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Name or number missing'
    })
  }

  const cont = contacts.find(n => n.name === body.name)
  if (cont) {
    return res.status(400).json({
      error: 'Name already exists'
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
    //id: Math.floor(Math.random() * 500)
  })

  contact
    .save()
    .then(savedContact => savedContact.toJSON())
    .then(savedAndFormatedContact => {
      res.json(savedAndFormatedContact)
    })
    .catch(error => next(error))
})

//DELETE CONTACT
app.delete('/api/persons/:id', (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => console.log(`Server running on port ${port}`))