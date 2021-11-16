const bcrypt = require('bcrypt')
const User = require('../models/User')
const { api, usersInDb } = require('./test_helper')
const mongoose = require('mongoose')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('pswd', 10)
  const user = new User({
    username: 'stephRoot',
    user: 'stephen',
    passwordHash
  })

  await user.save()
})

describe('creating a new user', () => {
  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'tefani22',
      name: 'stefani',
      password: 'tw1tch'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'stephRoot',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
