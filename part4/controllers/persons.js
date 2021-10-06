const personsRouter = require('express').Router()
const Person = require('../models/Person')

personsRouter.get('/', (request, response) => {
  Person.find({})
    .then(persons => response.json(persons))
})

personsRouter.get('/info', (request, response) => {
  const date = new Date()
  Person.find({}).then(persons => {
    persons.map(person => person.toJSON())
    response.send(
      `<p>Phonebook: ${persons.length} personal info</p>` + date
    )
  })
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      response.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))

  response.status(201).json(person)
})

personsRouter.put('/api/persons/:id', (request, response, next) => {
  const person = request.body

  const newPersonInfo = {
    name: person.name,
    number: person.number
  }

  Person.findByIdAndUpdate(request.params.id, newPersonInfo, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

module.exports = personsRouter
