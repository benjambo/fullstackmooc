import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from '../components/SimpleBlog'

afterEach(cleanup)

let blog = { title: 'Haul of War', author: 'Benjamin B', likes: 0 }

test('Simple blog test', () => {
  const onClick = event => {
    blog = { ...blog, likes: blog.likes + 1 }
    console.log(event.target.value)
  }

  const component = render(<SimpleBlog onClick={onClick} blog={blog} />)

  expect(component.container).toHaveTextContent('Haul of War')
  expect(component.container).toHaveTextContent('Benjamin B')

  const div = component.container.querySelector('div')
  expect(div).toHaveTextContent(`blog has ${blog.likes} likes`)
})

test('Button test', () => {
  const mockHandler = jest.fn()

  const component = render(<SimpleBlog onClick={mockHandler} blog={blog} />)
  const button = component.container.querySelector('button')

  console.log(prettyDOM(button))

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
