import React from 'react'
import Kurssi from './components/Kurssi'
import Otsikko from './components/Otsikko'
import Yhteensa from './components/Yhteensa'
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

