import React from 'react'
import { act } from 'react-dom/test-utils';
import { render, waitForElement } from '@testing-library/react'
import { cleanup , fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
jest.mock('./services/blogs')
import App from './App'


/*
describe('<App />', () => {
  test('renders all notes it gets from backend', async () => {
    let component

    act(() => {

      component = render(
        <App />
      )})


    act(() => {
      component.rerender(<App />)
    })


    await waitForElement(
      () => component.container.querySelector('.togglableContent')
    )

    const button = component.getByText('login')

    fireEvent.click(button)
    
    const form = component.getByText('kirjaudu')

    fireEvent.click(form)

    component.debug()

    await waitForElement(
      () => component.container.querySelectorAll('.container')
    )


    expect(component.container).toHaveTextContent(
      'HTML is easy'
    )
    expect(component.container).toHaveTextContent(
      'Browser can execute only javascript'
    )
    expect(component.container).toHaveTextContent(
      'The most important methods of HTTP are GET and POST'
    )
  })
})

*/