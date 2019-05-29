import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup , fireEvent } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import Blog from './Blog'
import Togglable from './Togglable'
import SimpleBlog from './SimpleBlog'


afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'testiblogi',
    author: 'testaaja',
    user:{
      id: 1
    },
    likes: 1
  }

  const user = {
    id: 1
  }

  const mockHandler = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={mockHandler} user={user}/>
  )

  component.debug()
  //console.log(prettyDOM(li))


  expect(component.container).toHaveTextContent(
    'testiblogi testaaja'
  )


  const button = component.container.querySelector('button')
  fireEvent.click(button)
  fireEvent.click(button)


  expect(mockHandler.mock.calls.length).toBe(2)

})

/*

test('renders content', () => {
  const blog = {
    content: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    user:{
      id: 1
    },
    important: true
  }

  const user = {
    id: 1
  }

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  component.debug()
  //console.log(prettyDOM(li))


  expect(component.container).toHaveTextContent(
    'Komponenttitestaus tapahtuu react-testing-library:llä'
  )
})

it('clicking the button calls event handler once', async () => {

  const blog = {
    content: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
    user:{
      id: 1
    },
    important: true
  }

  const user = {
    id: 1
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} toggleImportance={mockHandler} user={user}/>
  )

  const button = getByText('Like')
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(1)
})

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  it('renders its children', () => {
    component.container.querySelector('.testDiv')
  })

  it('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  it('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  it('toggled content can be closed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  

})

*/