const User = require('../models/user')

const initialBlogs = [
  {
    title: 'The Massacre of chickens',
    author: 'John Nugget',
    url: 'www.deeznuggets.com/chickensmassacre',
    likes: 53
  },
  {
    title: 'The Chicken Barbeque',
    author: 'John Nugget',
    url: 'www.deeznuggets.com/chikcenbarbeque',
    likes: 14
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialUsers = [
  {
    username: 'benjambo',
    name: 'Benjamin B',
    password: 'benjambo'
  },
  {
    username: 'joshin',
    name: 'Joshua S',
    password: 'joshin'
  }
]

module.exports = { initialBlogs, initialUsers, usersInDb }
