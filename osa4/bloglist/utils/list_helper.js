const _ = require('lodash')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => Math.max(max, blog.likes)
  return blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
  const result = _(blogs).groupBy('author').map(
    groups => ({...groups[0], amount: groups.length})
  )

  /*const reducer = (max, blog) => Math.max(max, blog.likes)
  const person = result.reduce(reducer, 0)*/

  result.forEach(blog => {
    let count = 0
    if(blog.amount > count){
      count = blog.amount
      blogs = blog
    }
  })

  const authors = {
    author: blogs.author,
    blogs: blogs.amount
  }
  return authors
}

const mostLikes = (blogs) => {
  const result = _(blogs).groupBy('author').map((author, person) => (
    {
      author: person,
      likes: _.sumBy(author, 'likes')
    }
  )).value()
  return _.maxBy(result, 'likes')
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}