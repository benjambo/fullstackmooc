import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('Login'))

    expect(component.container).toHaveTextContent('Log into application')
  })

  test('if user logged in, blogs are rendered', async () => {
    const user = {
      username: 'benjambo',
      token: '1231231214',
      name: 'Benjamin B'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.container.querySelector('.blogs'))

    component.debug()

    const blogs = component.container.querySelectorAll('.blogs')
    expect(blogs.length).toBe(5)
  })
})
