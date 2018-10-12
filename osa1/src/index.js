
import React from 'react';
import ReactDOM from 'react-dom';

/* TEHTÄVÄ 1.1 - 1.2


const Otsikko = (props) => {

    return (

      <div>

        <h1>{props.name}</h1>

      </div>

    )

  }




const Sisalto = (props) => {

    return (

      <div>

        <Osa osa={props.osa1} tehtavia={props.tehtavia1}/>

        <Osa osa={props.osa2} tehtavia={props.tehtavia2}/>

        <Osa osa={props.osa3} tehtavia={props.tehtavia3}/>

      </div>

    )

  }




const Yhteensa = (props) => {

    return (

      <div>

        <p>Yhteensä {props.yhteensa}</p>

      </div>

    )

  }




const Osa = (props) => {

    return (

      <div>

        <p>{props.osa} {props.tehtavia}</p>

      </div>

    )

  }







const App = () => {

  const kurssi = 'Half Stack -sovelluskehitys'

  const osa1 = 'Reactin perusteet'

  const tehtavia1 = 10

  const osa2 = 'Tiedonvälitys propseilla'

  const tehtavia2 = 7

  const osa3 = 'Komponenttien tila'

  const tehtavia3 = 14




  return (

    <div>

      <Otsikko name={kurssi} />

      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3}/>

      <Yhteensa yhteensa={tehtavia1 + tehtavia2 + tehtavia3} />

    </div>

  )

}

*/



/* TEHTÄVÄ 1.3

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  
    return (
      <div>
        <h1>{kurssi}</h1>
        <p>{osa1.nimi} {osa1.tehtavia}</p>
        <p>{osa2.nimi} {osa2.tehtavia}</p>
        <p>{osa3.nimi} {osa3.tehtavia}</p>
        <p>Yhteensä {osa1.tehtavia + osa2.tehtavia + osa3.tehtavia}</p>
      </div>
    )
  }

  */

/* TEHTÄVÄ 1.4

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osat = [
    {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
  ]

  return (
    <div>
      <h1>{kurssi}</h1>  
      <p>{osat[0]["nimi"]} {osat[0]["tehtavia"]}</p>
      <p>{osat[1]["nimi"]} {osat[1]["tehtavia"]}</p>
      <p>{osat[2]["nimi"]} {osat[2]["tehtavia"]}</p>
      <p>Yhteensä {osat[0]["tehtavia"] + osat[1]["tehtavia"] + osat[2]["tehtavia"]}</p>
    </div>
  )
}

*/

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <h1>{kurssi.nimi}</h1>
      <p>{kurssi.osat[0]["nimi"]} {kurssi.osat[0]["tehtavia"]}</p>
      <p>{kurssi.osat[1]["nimi"]} {kurssi.osat[1]["tehtavia"]}</p>
      <p>{kurssi.osat[2]["nimi"]} {kurssi.osat[2]["tehtavia"]}</p>
      <p>Yhteensä {kurssi.osat[0]["tehtavia"] + kurssi.osat[1]["tehtavia"] + kurssi.osat[2]["tehtavia"]}</p>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));

