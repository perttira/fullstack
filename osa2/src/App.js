import React from 'react'
import Kurssi from './components/Kurssi'
import Otsikko from './components/Otsikko'
import Yhteensa from './components/Yhteensa'
import Note from './components/Note'
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
//    2.8 puhelinluettelo osa 3

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { 
          name: 'Bertta Siippa',
          phone: '050-7654321',
          id: '0'
        },
        { 
          name: 'Aapo Kuullos',
          phone: '050-3532666',
          id: '1'
        },        { 
          name: 'Cecilia Milan',
          phone: '040-3555666',
          id: '2'
        },        { 
          name: 'Faarao Muhammed',
          phone: '050-1234567',
          id: '3'
        }
      ],
      newName: '',
      newPhone: '',
      filter: ''
    }
  }

  addNote = (event) => {

    event.preventDefault()

    var onkoNimiOlemassa = true

    this.state.persons.forEach(function(item, index) {
      console.log("this", this)
      if(item.name === this.state.newName){
        console.log("SAMANIMI")
        onkoNimiOlemassa = false
      }
     }.bind(this));
      
     if(onkoNimiOlemassa) {
       
      const noteObject = {
        name: this.state.newName,
        phone: this.state.newPhone,
        id: this.state.persons.length + 1
        }
        
       const persons = this.state.persons.concat(noteObject)
       
       this.setState({
         persons: persons,
         newName: '',
         newPhone: ''
       })
        alert("Nimi tallennettu");
      }else{
        this.setState({
          newName: '',
          newPhone: ''
        })
        alert("Tämä nimi on jo olemassa! Kirjoita jokin toinen nimi.");
      }
       
  }

  handleChanges = (event) => {

    console.log("event.target.value", event.target.name)
    console.log("this.state[newName]", this.state["newName"])

    if(event.target.name === "newName"){
      this.setState({ newName: event.target.value })
    }else{
      this.setState({ newPhone: event.target.value });
    }
  }

  toggleVisible = () => {
    this.setState({showAll: !this.state.showAll})
  }

  render() {
    const notesToShow = this.state.persons.filter(person => person.name === this.state.filter)

  const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <label>rajaa näytettäviä </label><input name="filter" value={this.state.filter} 
            onChange={this.handleChanges}/>
        <form onSubmit={this.addNote}>
          <label>nimi: </label><input name="newName" value={this.state.newName} 
            onChange={this.handleChanges}/>
            <br/>
          <label>numero: </label><input name="newPhone" value={this.state.newPhone} 
            onChange={this.handleChanges}/>
            <br/>
          <button type="submit">tallenna</button>
        </form>
        <h1>Numerot</h1>
        <ul>
          {this.state.persons.map(person => <Note key={person.id} name={person.name} phone={person.phone}/>)}
          Filtteröidyt : {notesToShow.map(note => <Note key={note.id} note={note} />)}
        </ul>
      </div>
    )
  }
}
export default App

