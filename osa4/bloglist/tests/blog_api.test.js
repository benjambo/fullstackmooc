const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('has an identifying field named id', async () => {
  const response = await api.get('/api/blogs')

  const identifying = response.body.map(r => r.id)

  expect(identifying).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Bringing Async to the game',
    author: 'Meredith Baggins',
    url: 'www.bagginsmer.com/async',
    likes: 6
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(titles).toContain('Bringing Async to the game')
})

test('unliked blog getting 0 likes', async () => {
  const newBlog = {
    title: 'I dont have any likes',
    author: 'The noLike',
    url: 'www.nolikes.com/nolikes'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likesGot = response.body.map(r => r.likes)

  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(likesGot.pop()).toBe(0)
})

test('an unvalid blog not added', async () => {
  const newBlog = {
    author: 'Meredith Baggins',
    likes: 18
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
