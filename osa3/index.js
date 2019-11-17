const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

const cors = require('cors')

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
      "name": "Berta Jackin",
      "number": "040-1632345",
      "id": 0
    },
    {
      name: "Bill Cage",
      number: "045-752514",
      id: 1
    },
    {
      "name": "Michael Fatson",
      "number": "09-4562156",
      "id": 2
    },
    {
      "name": "Hugh Fackman",
      "number": "04-7321193",
      "id": 3
    }
  ]

  app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Phonebook</h1>')
  })

  const generateId = () => {
    const maxId = contacts.length > 0
      ? Math.max(...contacts.map(n => n.id))
      : 0
    return maxId + 1
  }

  const info = {
      content: `Phonebook has info for ${generateId()} people`,
      date: new Date()
  }

  app.get('/info', (req, res) => {
    res.send(info.content + '<br />' + info.date)
  })

  app.get('/api/persons/:id', (req, res) => {
      const contact = contacts.find(n => n.id === parseInt(req.params.id))
      if (contact) {
        res.send(contact.name + '<br />' + contact.number)
      } else {
        res.status(404).end()
      }
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(contacts)
  })

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

      const contact = {
          name: body.name,
          number: body.number,
          id: Math.floor(Math.random() * 100)
      }
      
      contacts = contacts.concat(contact)
      res.send(contact)
      console.log(contacts);
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(c => c.id !== id)  
    res.status(204).end()
  })
  
  const port = process.env.PORT || 3001
  app.listen(port, () => console.log(`Server running on port ${port}`))