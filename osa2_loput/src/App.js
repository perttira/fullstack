import React, { Component } from 'react';
import './App.css';
import axios from 'axios'


// 2.11 puhelinluettelo osa 6 & 2.12* maiden tiedot


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newNote: '',
      filter: '',
      showAll: true
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  filtteroi = () => {

   console.log("PITUUS", this.state.persons.filter(person => person.name.startsWith(this.state.filter)).length)
      
      if(this.state.persons.filter(person => person.name.startsWith(this.state.filter)).length > 10 ) {
        console.log("PITUUS IFFISSÄ", this.state.persons.filter(person => person.name.startsWith(this.state.filter)).length)

      return []

    } else {
      return this.state.persons.filter(person => person.name.startsWith(this.state.filter))
    } 

    
       
  }

  handleChanges = (event) => {

    console.log("event.target.value", event.target.name)
    console.log("this.state[newName]", this.state["newName"])

    if(event.target.name === "newName"){
      this.setState({ newName: event.target.value })
    }else if (event.target.name === "newPhone") {
      this.setState({ newPhone: event.target.value })
    }else{
      this.setState({ filter: event.target.value })
    }
  }

  render() {

    console.log("persons taulukko kokonaisuudessaan", this.state.persons)

   var montakoMaata = 't'
   var notesToShow = this.filtteroi().map(person => <Henkilot key={person.id} name={person.name}/>)
   console.log("PITUUS RENDERISSÄ", this.filtteroi().length)
    if(this.filtteroi().length === 0){
      montakoMaata = "too many matches, specify another filter"
    }
    if(this.filtteroi().length === 1) {
      notesToShow = this.filtteroi().map(person => <Henkilot luokka="naytaKaikkiTiedot" key={person.id} name={<h1>{person.name}</h1>} capital={<p>capital: {person.capital}</p>} population={<p>population: {person.population}</p>} flag={<img src={person.flag} alt="flag" height="100" width="200"/>}/>)
      montakoMaata = ''
    }
    console.log('render')

    console.log("filtteroi()", this.filtteroi())
    return (

      <div className="App">
        <label>find countries :</label>
          <Rajaa name="filter" value={this.state.filter} onChange={this.handleChanges} persons={this.state.persons}/>
          {montakoMaata}
        <ul>
          {notesToShow}
        </ul>
      </div>
    );
  }
}

const Henkilot = ({ luokka, name, capital, population, flag }) => {
  return (
    <li class={luokka}> {name}  {capital} {population} {flag} </li>
  )
}

const Rajaa = (props) => {
  return (
    <div>
      <input name={props.name} value={props.value}  onChange={props.onChange}/>
      
    </div>
  )
}

export default App;
