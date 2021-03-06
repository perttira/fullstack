/*  Normaalisti React-komponentit renderöityvät DOM:iin. Nyt kuitenkin renderöimme komponentteja
    testeille sopivaan muotoon laittamatta niitä DOM:iin. render palauttaa olion, jolla on useita kenttiä.
    Yksi kentistä on container, se sisältää koko komponentin renderöimän HTML:n. Ekspektaatiossa varmistamme,
    että komponenttiin on renderöitynyt oikea teksti. Create-react-app:issa on konfiguroitu testit oletusarvoisesti
    suoritettavaksi ns. watch-moodissa, eli jos suoritat testit komennolla npm test, jää konsoli odottamaan koodissa
    tapahtuvia muutoksia. Muutosten jälkeen testit suoritetaan automaattisesti ja Jest alkaa taas odottamaan
    uusia muutoksia koodiin. Jos haluat ajaa testit "normaalisti", se onnistuu komennolla: CI=true npm test.
    Renderin palauttaman olion metodilla debug voimme tulostaa komponentin tuottaman HTML:n konsoliin.
    On myös mahdollista etsiä komponentista pienempi osa, ja tulostaa sen HTML-koodi, tällöin tarvitsemme
    metodia prettyDOM, joka löytyy react-testing-library:n mukana tulevasta kirjastosta @testing-library/dom:
    console.log(prettyDOM(li)).
*/

import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup , fireEvent, waitForElement } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import Blog from './Blog'
import SimpleBlog from './SimpleBlog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
jest.mock('../services/blogs')
jest.mock('../services/login')
import App from '../App'
import { log } from 'util'
//import '@testing-library/jest-dom/extend-expect'

const Wrapper = (props) => {

  const onChange = (event) => {
    props.state.value = event.target.value
  }

  return (
    <BlogForm
      value={props.state.value}
      onSubmit={props.onSubmit}
      handleChange={onChange}
    />
  )
}

//afterEach(cleanup)
describe('<App />', () => {

  test('5.13: blogilistan testit, step1 && 5.14: blogilistan testit, step2', () => {
    let blog = {
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

    /*  Tapahtumankäsittelijäksi annetaan Jestin avulla määritelty mock-funktio.
      Testi hakee renderöidystä komponentista napin tekstin perusteella ja klikkaa sitä:
      fireEvent.click(button)
  */
    const mockHandler = jest.fn()

    const component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} user={user}/>
    )

    //component.debug()
    //console.log(prettyDOM(li))


    expect(component.container).toHaveTextContent(
      'testiblogi testaaja'
    )


    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)


    expect(mockHandler.mock.calls.length).toBe(2)

  })


  test('5.15*: blogilistan testit, step3', () => {

    let mockBlog = {
      title: 'testiblogi',
      author: 'testaaja',
      url: 'www.google.com',
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
      <Blog blog={mockBlog} onClick={mockHandler} user={user} hideBlog={false}/>
    )

    //component.debug()
    //console.log(prettyDOM(Blog))

    expect(component.container).toHaveTextContent(
      'Blog name: testiblogiBlog author: testaaja'
    )

    const div = component.container.querySelector('.hideBlog')
    //fireEvent.click(div)
    expect(div).toHaveStyle('display: none')

    fireEvent.click(div)

    expect(div).toHaveStyle('display: block')


    expect(component.container).toHaveTextContent(
      'Blog url: www.google.com Blog likes: 1'
    )

  })


  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const onSubmit = jest.fn()
    const state = {
      value: ''
    }

    const component = render(
      <Wrapper onSubmit={onSubmit} state={state} />
    )

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(input, { target: { value: 'lomakkeiden testaus on hankalaa' } })
    fireEvent.submit(form)

    expect(onSubmit.mock.calls.length).toBe(1)
    expect(state.value).toBe('lomakkeiden testaus on hankalaa')
  })


  test('5.16*: blogilistan testit, step4', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Blogs login')
    )
    //component.debug()
    const button = component.getByText('Blogs login')
    //console.log(prettyDOM(button))
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: block')
  })



  test('5.17*: blogilistan testit, step5', async () => {

    const user = {
      username: 'mluukkai',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI1ZDUxNmY2NmViNjhhNjBjNmIwNGRmZTYiLCJpYXQiOjE1NjY5MDc0ODN9.rLoqkGhGaPGjDK7Utt-zgbaekT-E0SlDE5SGh1tX9hQ',
      name: 'Matti Luukkainen',
      password: 'salainen',
      id: '5a437a9e514ab7f168ddf138'
    }

    const component = render(
      <App />
    )

    component.rerender(<App />)

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    await waitForElement(
      () => component.getByText('Blogs login')
    )

    const button = component.getByText('Blogs login')

    fireEvent.click(button)
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: block')

    
    const button1 = component.getByText('Login')
    fireEvent.submit(button1)


    await waitForElement(
      () => component.container.querySelector('#container-blogs')
    )

    const div2 = component.container.querySelector('#container-blogs')

    expect(div2).toHaveStyle('display: block')

    component.debug()

  })
})

