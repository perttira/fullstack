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
import App from '../App'
import { log } from 'util';
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



  test('5.17*: blogilistan testit, step5', async () => {

    const user = {
      username: 'mluukkai',
      token: '1231231214',
      name: 'Matti Luukkainen',
      password: 'salainen',
      id: '5a437a9e514ab7f168ddf138'
    }



    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    

    const component = render(
      <App />
    )
    component.rerender(<App />)

    
    await waitForElement(
      () => component.getByText('Blogs login')
    )

    const button = component.getByText('Blogs login')

    fireEvent.click(button)

    const div = component.container.querySelector('#login-form')
    //fireEvent.click(div)
    expect(div).toHaveStyle('display: block')

    //const input = component.container.querySelector('tunnus')
    //const input2 = component.container.querySelector('salasana')

    //fireEvent.change(input, { target: { value: 'mluukkai' } })
    //fireEvent.change(input2, { target: { value: 'salainen' } })



    const button1 = component.container.querySelector('.login')

    fireEvent.submit(button1)
    component.debug()

    await waitForElement(
      () => component.container.querySelector('.blogs-header')
    )

    const div2 = component.container.querySelector('.blogs-header')
    expect(div2).toHaveStyle('display: block')

  })
})

