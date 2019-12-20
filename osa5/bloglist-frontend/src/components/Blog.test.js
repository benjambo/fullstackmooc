import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

afterEach(cleanup)

test('Blog test', () => {
  const Data = {
    title: 'The Chicken Massacre',
    author: 'Benjamin B',
    url: 'www.deeznuggets.com/chicken',
    likes: 14,
    userId: {
      username: 'benjambo',
      name: 'Benjamin B',
      id: '5dc8dea6024ea0e0bdcb0ab'
    },
    id: '5d3dfa7112e0340244139875'
  }

  const user = {
    username: 'benjambo',
    name: 'Benjamin B',
    id: '5dc8dea6024ea0e0bdcb0ab'
  }

  const component = render(
    <Blog blog={Data} key={1} setBlogs={''} user={user} />
  )
  const div = component.container.querySelector('.notClicked')
  expect(div).toHaveTextContent('The Chicken Massacre')
  fireEvent.click(div)
  //expect(div).toHaveTextContent('added by BenjaminB')
  //expect(div).toHaveTextContent('www.deeznuggets.com/chicken')
})
