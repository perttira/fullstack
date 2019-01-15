import React, { Component } from 'react';
import './App.css';
import axios from 'axios'


// 2.11 puhelinluettelo osa 6 & 2.12* maiden tiedot


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      newNote: '',
      showAll: true
    }
    this.handleClick = this.handleClick.bind(this);

    console.log('constructor')
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  filtteroi = () => {

   console.log("PITUUS", this.state.countries.filter(maa => maa.name.startsWith(this.state.filter)).length)
      
      if(this.state.countries.filter(maa => maa.name.startsWith(this.state.filter)).length > 10 ) {
        console.log("PITUUS IFFISSÄ", this.state.countries.filter(maa => maa.name.startsWith(this.state.filter)).length)

      return []

    } else {
      return this.state.countries.filter(maa => maa.name.startsWith(this.state.filter))
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

  handleClick(maa){
      this.setState({ filter: maa })
  }

  render() {

    console.log("countries taulukko kokonaisuudessaan", this.state.countries)

   var montakoMaata = ''
   var notesToShow = this.filtteroi().map(maa => <Maa key={maa.id} name={maa.name} onClick={() => this.handleClick(maa.name)}/>)
   console.log("PITUUS RENDERISSÄ", this.filtteroi().length)
    if(this.filtteroi().length === 0){
      montakoMaata = "too many matches, specify another filter"
    }
    if(this.filtteroi().length === 1) {
      notesToShow = this.filtteroi().map(maa => <Maa  onClick={() => this.handleClick(maa.name)} luokka="naytaKaikkiTiedot" key={maa.id} name={<h1>{maa.name}</h1>} capital={<p>capital: {maa.capital}</p>} population={<p>population: {maa.population}</p>} flag={<img src={maa.flag} alt="flag" height="100" width="200"/>}/>)
      montakoMaata = ''
    }
    console.log('render')

    console.log("filtteroi()", this.filtteroi())
    console.log("notesToShow", notesToShow)


    return (

      <div className="App">
        <label>find countries :</label>
          <Rajaa name="filter" onChange={this.handleChanges} value={this.state.filter} countries={this.state.countries}/>
          {montakoMaata}
        <ul>
          {notesToShow}          
        </ul>
      </div>
    );
  }
}

const Maa = (props) => {
  console.log("onClick", props.onClick)

  return (

    <ul class="maa">
      <li  class={props.luokka}> <div value={props.name} onClick={props.onClick}> {props.name} </div> {props.capital} {props.population} {props.flag} </li>
    </ul>
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
