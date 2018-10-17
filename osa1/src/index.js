
import React from 'react';
import ReactDOM from 'react-dom';

/*

const App = (props) => {
  const {counter} = props
  return (
    <div>{counter.value}</div>
  )
}

const counter = {
  value: 1
}

const renderoi = () => {
  ReactDOM.render(
    <App counter={counter} />,
    document.getElementById('root')
  )
}

setInterval(() => {
  renderoi()
  counter.value += 1;
}, 1000)

*/


/*

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 1
    }

//  React-komponenttien tilaa, eli muuttujaa this.state ei saa päivittää suoraan,
//  tilan päivitys on tehtävä aina funktion setState avulla.
//  Metodin kutsuminen päivittää tilan ja aiheuttaa komponentin uuden 
//  renderöinnin (ellei sitä ole estetty myöhemmin esiteltävällä tavalla). 
//  Uudelleenrenderöinnin yhteydessä myös kaikki komponentin sisältämät 
//  alikomponentit renderöidään.

    setInterval(() => {
      this.setState({ counter: this.state.counter + 1 })
    }, 1000)
  }
  render() {
    console.log('renderöidään', this.state.counter)
    return (
      <div>{this.state.counter}</div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

*/

/* TAPAHTUMANKÄSITTELIJÄ 

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 1
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <button onClick={() => this.setState({ counter: this.state.counter + 1 })}>
          plus
        </button>
        <button onClick={() => this.setState({ counter: 0 })}>
          zero
        </button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

*/

/*   METODIEN KÄYTTÖ JA THIS    

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 1
    }
    this.kasvataYhdella = this.kasvataYhdella.bind(this)
    this.nollaa = this.nollaa.bind(this)
  }

  kasvataYhdella() {
    this.setState({ counter: this.state.counter + 1 })
  }

  nollaa() {
    this.setState({ counter: 0 })
  }

  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <div>
        <button onClick={this.kasvataYhdella}>
          plus
        </button>
        <button onClick={this.nollaa}>
          zero
        </button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


*/


/*   TILAN VIEMINEN ALIKOMPONENTTIIN   

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      counter: 1
    }
  }

  asetaArvoon = (arvo) => {
    return () => {
      this.setState({ counter: arvo })
    }
  }

  render() {
    return (
      <div>
        <Display counter={this.state.counter}/>
        <div>
          <Button
            handleClick={this.asetaArvoon(this.state.counter + 1)}
            text="Plus"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.counter - 1)}
            text="Minus"
          />
          <Button
            handleClick={this.asetaArvoon(0)}
            text="Zero"
          />
        </div>
      </div>
    )
  }
}

// Voidaan lyhentää muotoon: const Display = ({ counter }) => <div>{counter}</div>
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

*/

/*  MONIMUTKAISEMMAN TILAN PÄIVITTÄMINEN   

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vasen: 0,
      oikea: 0
    }
  }

  klikVasen = () => {
    this.setState({
      vasen: this.state.vasen + 1
    })
  }

  klikOikea = () => {
    this.setState({
      oikea: this.state.oikea + 1
    })
  }

  render() {
    return (
      <div>
        <div>
          {this.state.vasen}
          <button onClick={this.klikVasen}>vasen</button>
          <button onClick={this.klikOikea}>oikea</button>
          {this.state.oikea}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

  MONIMUTKAISEMMAN TILAN PÄIVITTÄMINEN */

/*      1.6 unicafe osa1    

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyvä: 0,
      neutraali: 0,
      huono: 0
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ hyvä: this.state.hyvä + 1 })}>
          Hyvä
        </button>
        <button onClick={() => this.setState({ neutraali: this.state.neutraali + 1 })}>
          Neutraali
        </button>
        <button onClick={() => this.setState({ huono: this.state.huono + 1 })}>
          Huono
        </button>
        <div><h1>Statistiikka</h1></div>
        <div>Hyvä {this.state.hyvä}</div>
        <div>Neutraali {this.state.neutraali}</div>
        <div>Huono {this.state.huono}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

*/

/*    1.7 UNICAFE OSA2   */

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyvä: 0,
      neutraali: 0,
      huono: 0,
      yhteensä: 0,
     // this.setState( neutraali: this.state.yhteensä + 1 )
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ hyvä: this.state.hyvä + 1, yhteensä: this.state.yhteensä + 1 })}>
          Hyvä
        </button>
        <button onClick={() => this.setState({ neutraali: this.state.neutraali + 1, yhteensä: this.state.yhteensä + 1 })}>
          Neutraali
        </button>
        <button onClick={() => this.setState({ huono: this.state.huono + 1, yhteensä: this.state.yhteensä + 1 })}>
          Huono
        </button>
        <div><h1>Statistiikka</h1></div>
        <div>Hyvä {this.state.hyvä}</div>
        <div>Neutraali {this.state.neutraali}</div>
        <div>Huono {this.state.huono}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)


