import React from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Kurssi from './components/Kurssi'
import Otsikko from './components/Otsikko'
import Yhteensa from './components/Yhteensa'
import Henkilot from './components/Henkilot'
import './style.css';

/*

//      OSA 2 2.1 kurssien sisältö
//      OSA 2 2.2 tehtävien määrä
//      OSA 2 2.3 reduce


const App = () => {
  
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',

    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ],
  }

  let yhteensa = kurssi.osat.reduce(function(sum, tehtavat){
    return sum + tehtavat.tehtavia
  },0)

console.log("kurssi.osat APP:issa :", kurssi.osat)
console.log("kurssi.osat APP:issa :", yhteensa)


  return (
    <div>
      {<Otsikko kurssinNimi={kurssi.nimi} />}
      {kurssi.osat.map(kurssi_map =><Kurssi key={kurssi_map.id} id={kurssi_map.id} tehtavia={kurssi_map.tehtavia} nimi={kurssi_map.nimi} />)}
      <div>
        <Yhteensa yhteensa={yhteensa} />
      </div>
    </div>
  )
}


export default App;

*/

/*

//      OSA 2 2.4 monta kurssia & OSA 2.5 erillinen moduuli



const App = () => {

  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14, 
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

const tulostaKurssit = () => {

  let palautettava = []
  let pushattava 

  kurssit.map(function(kurssi_map){ 

    palautettava.push(<h1><Otsikko kurssinNimi = {kurssi_map.nimi}/></h1>)
    palautettava.push(kurssi_map.osat.map(osat=><Kurssi nimi = {osat.nimi} id = {osat.id} tehtavia = {osat.tehtavia}/>))
    
    let kurssitTaulukossa = kurssi_map.osat.map(function(osat){
      return osat.tehtavia
    })
    
    pushattava = kurssitTaulukossa.reduce(function(sum, order){      
      return sum + order
    },0)

    palautettava.push(<Yhteensa yhteensa = {pushattava}/>)
  
  })
  return palautettava
}

  return (
    <div>
      {tulostaKurssit()}
    </div>
  )
}

export default App;

*/


//    OSA 2 2.6 puhelinluettelo osa 1 & OSA 2.7 puhelinluettelo osa 2 &
//    2.8 puhelinluettelo osa 3 & 2.9* puhelinluettelo osa 4
//    & 2.10 puhelinluettelo osa 5 & 2.11 osa 6 & 2.14 puhelinluettelo osa 7
//    & 2.15 puhelinluettelo osa 8 & 2.16 puhelinluettelo osa 9


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      filtteroi: [],
      newName: '',
      newNumber: '',
      filter: '',
    }
  }

componentDidMount() {
  console.log('did mount')
  noteService
    .getAll()
    .then(response => {
      console.log("axios get response", response)
      let mapattuPersons = response.data.map((person) => person)
      console.log("mapattuPersons", mapattuPersons)

      this.setState({ persons: mapattuPersons })
      this.setState({filtteroi: mapattuPersons })
    })
}

       
addPerson = (event) => {
  event.preventDefault()
  const noteObject = {
    name: this.state.newName,
    number: this.state.newNumber,
  }
  console.log("addPerson noteobject", noteObject)

  console.log("addPerson persons", this.state.persons)

  let nameFound = false
  var paivitettavanId
  
  this.state.persons.forEach(element => {
    console.log("addPerson foreach element.name", element.name)
    console.log("addPerson foreach  element.id", element.id)

    console.log("addPerson foreach  noteObject.name", noteObject.name)

    if (element.name === noteObject.name) {
      console.log("if element", element)
      console.log("if element.id", element.id)

      console.log("nameFound")
      nameFound = true
      paivitettavanId = element.id
    }
    
  })
  console.log("nameFound ennen iffiä", nameFound)

  if (nameFound && window.confirm("Henkilö on jo olemassa. Haluatko päivittää henkilön tiedot?")) {
    console.log("TRUE && TRUE")
    console.log("paivitettavanId", paivitettavanId)

    noteService
    .update(paivitettavanId,noteObject)
    .then(response => {
      console.log("axios post response", response)
      this.setState( {newName: '', newNumber: ''})

      const noteObject = {
        name: response.data.name,
        number: response.data.number,
        id: paivitettavanId
      }
      this.setState ( {persons: this.state.persons.filter(person => person.id === paivitettavanId)} )
    })

  }else{
     noteService
      .create(noteObject)
      .then(response => {
        console.log("axios post response create", response)
        this.setState( {newName: '', newNumber: ''})

        const noteObject = {
          name: response.data.name,
          number: response.data.number,
          id: this.state.persons.length + 1
        }
        this.setState ( {persons: this.state.persons.concat(noteObject)} )
      })
  }
}

deletePerson = (id) => {
  console.log("deletePerson id", id)

  if (window.confirm("Do you really want to remove this person?")) { 
    noteService
      .remove(id)
      .then(response => {
        // Tekee uuden taulukon joka ei sisällä id:n omaavaa henkilöä
        this.setState({persons: this.state.persons.filter(elem => elem.id !== id)})
      })
  }
}

  handleChanges = (event) => {

    console.log("event.target.value", event.target.name)
    console.log("this.state[newName]", this.state["newName"])

    if(event.target.name === "newName"){
      this.setState({ newName: event.target.value })
    }else if (event.target.name === "newNumber") {
      this.setState({ newNumber: event.target.value })
    }else{
      this.setState({ filter: event.target.value })
    }
  }


  toggleVisible = () => {
    this.setState({showAll: !this.state.showAll})
  }


  render() {
    //console.log("props", this.props)
    const filtteroi = this.state.persons.filter(person => person.name.startsWith(this.state.filter))
  
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <label>rajaa näytettäviä </label>
        <Rajaa name="filter" value={this.state.filter} onChange={this.handleChanges} persons={this.state.persons}/>
        <h1>Lisää uusi</h1>
        <form onSubmit={this.addPerson}>
          <label>nimi: </label><input name="newName" value={this.state.newName} 
            onChange={this.handleChanges}/>
            <br/>
          <label>numero: </label><input name="newNumber" value={this.state.newNumber} 
            onChange={this.handleChanges}/>
            <br/>
          <button type="submit">tallenna</button>
        </form>
          <h1>Numerot</h1>
          <ul>
            {filtteroi.map(person => <Henkilot key={person.id} id={person.id} name={person.name} number={person.number} onClick={() => this.deletePerson(person.id)}/>)}
          </ul>
      </div>
    )
  }
}

const Rajaa = (props) => {
  return (
    <div>
      <input name={props.name} value={props.value}  onChange={props.onChange}/>
    </div>
  )
}

export default App