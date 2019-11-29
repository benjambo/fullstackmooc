const listHelper = require('../utils/list_helper')

const blogs = [
  {
    title: 'The Massacre of chickens',
    author: 'John Nugget',
    url: 'www.deeznuggets.com/chickensmassacre',
    likes: 53,
  },
  {
    title: 'The Chicken Barbeque',
    author: 'John Nugget',
    url: 'www.deeznuggets.com/chikcenbarbeque',
    likes: 14,
  },
  {
    title: 'The Filthy Animal',
    author: 'Pippin Eggs',
    url: 'www.eggiebarb.com/filthyanimals',
    likes: 17,
  },   {
    title: 'Under The Kitchen Chair',
    author: 'Pippin Eggs',
    url: 'www.eggiebarb.com/kitchenchair',
    likes: 4,
  },   {
    title: 'Making A Dog Pie',
    author: 'Pippin Eggs',
    url: 'www.eggiebarb.com/dogpie',
    likes: 47,
  }
]

test('dummy returns 1', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
  test('of all the blogs is right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(135)
  })
})

describe('Favorite blog', () => {
  test('is right', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(53)
  })
})

describe('Most blogs', () => {
  const mostWritten = {
    author: 'Pippin Eggs',
    blogs: 3
  }

  test('is right', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostWritten)
  })
})

describe('Most likes', () => {
  const mostAllLikes = {
    author: 'Pippin Eggs',
    likes: 68
  }
    
  test('is right', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostAllLikes)
  })
})