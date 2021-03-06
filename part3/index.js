const express = require("express")
const logger = require("./loggerMiddleware")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.use(logger)

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get("/info", (request, response) => {
  response.send(generateInfo())
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons/", (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: "name missing" })
  } else if (!body.number) {
    return response.status(400).json({ error: "number missing" })
  } else if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = [...persons, person]

  response.status(201).json(person)
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0
  return maxId + 1
}

const generateInfo = () => {
  return `Phonebook has info for ${persons.length} people
          <br><br>
          ${new Date()}`
}

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
