import React from 'react'
import Kurssi from './components/Kurssi'
import Yhteensa from './components/Yhteensa'
import Otsikko from './components/Otsikko'



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
