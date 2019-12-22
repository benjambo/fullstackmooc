const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// GET
bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })
  response.json(blogs.map(blog => blog.toJSON()))
})

// POST
bloglistRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (
      !Object.prototype.hasOwnProperty.call(body, 'url') ||
      !Object.prototype.hasOwnProperty.call(body, 'title')
    ) {
      response.status(400).end()
    } else if (!Object.prototype.hasOwnProperty.call(body, 'likes')) {
      let likedNone = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0,
        user: user._id
      }
      const unlikedBlog = new Blog(likedNone)
      await unlikedBlog.save()

      user.blogs = user.blogs.concat(unlikedBlog._id)
      await user.save()

      response.json(unlikedBlog.toJSON())
    } else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      })
      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.json(savedBlog.toJSON())
    }
  } catch (error) {
    next(error)
  }
})

// DELETE
bloglistRouter.delete('/:id', async (request, response, next) => {
  const exists = await Blog.findById(request.params.id)

  if (!exists) {
    response
      .status(404)
      .json({ error: 'blog does not exist' })
      .end()
  } else {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch (error) {
      next(error)
    }
  }
})

// UPDATE
bloglistRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const editableBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    await Blog.findByIdAndUpdate(request.params.id, editableBlog, { new: true })
    response
      .status(200)
      .json(editableBlog)
      .end()
  } catch (error) {
    response.status(400).json({ error: 'blog does not exist' })
    next(error)
  }
})

module.exports = bloglistRouter
