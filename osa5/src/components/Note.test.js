import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    content: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    important: true
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Komponenttitestaus tapahtuu react-testing-library:llä'
  )
})