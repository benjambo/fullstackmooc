const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(helper.initialUsers[0])
  await userObject.save()

  userObject = new User(helper.initialUsers[1])
  await userObject.save()
})

describe('when there is initially two user at db', () => {
  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.initialUsers

    const newUser = {
      username: 'mandy',
      name: 'Matt Dammon',
      password: 'mattd'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('User will not be added if there is under 3 characters', async () => {
    const newUser = {
      username: 'be',
      name: 'Benjamin B',
      password: 'be'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const response = await api.get('/api/users')

    expect(response.body.length).toBe(2)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
