
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

/*    1.7 UNICAFE OSA2   

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyvä: 0,
      neutraali: 0,
      huono: 0,
      yhteensä: 0,
    }
  }

  render() {

    let positiivisia=0;
    let keskiarvo =0;
    
    //console.log(isNaN (((this.state.hyvä)/this.state.yhteensä)*100))

    if (isNaN (((this.state.hyvä)/this.state.yhteensä)*100)) {
      positiivisia = <div>Positiivisia 0%</div> ;
    } else {
      positiivisia = <div>Positiivisia {((this.state.hyvä)/this.state.yhteensä)*100}%</div> ;
    }

    if (isNaN ((((this.state.hyvä + (-Math.abs(this.state.huono)))/this.state.yhteensä)*100))) {
      keskiarvo = <div>Keskiarvo 0</div> ;
    } else {
      keskiarvo = <div>keskiarvo {(((this.state.hyvä + (-Math.abs(this.state.huono)))/this.state.yhteensä)*100)}</div> ;
    }

    return (
      <div>
        <div><h1>Anna palautetta</h1></div>
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
        <div>{keskiarvo}</div>
        <div>{positiivisia}</div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

*/

/*     1.8 UNICAFE OSA 3       

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyvä: 0,
      neutraali: 0,
      huono: 0,
      yhteensä: 0,
    }
  }

  onkoNan(luku) {
    let palautettava
    if (isNaN(luku)) {
      palautettava = 0
    } else {
      palautettava = luku
    }
    return palautettava
  }

  laskeKeskiarvo() {
    let keskiarvo = (((this.state.hyvä + (-Math.abs(this.state.huono)))/this.state.yhteensä)*100)
    return this.onkoNan(keskiarvo)
  }

  laskePositiiviset() {
    let positiiviset = (((this.state.hyvä)/this.state.yhteensä)*100)
    return this.onkoNan(positiiviset)
  }

  asetaArvoon = (arvo,arviointi) => () => this.setState({[arviointi]: arvo, yhteensä: this.state.yhteensä+1})

  render() {
    
    return (
      <div>
        <div><h1>Anna palautetta</h1></div>
        <Button
          handleClick={this.asetaArvoon(this.state.hyvä + 1, "hyvä")}
          text="Hyvä"
        />
        <Button
          handleClick={this.asetaArvoon(this.state.neutraali + 1, "neutraali")}
          text="Neutraali"
        />
        <Button
          handleClick={this.asetaArvoon(this.state.huono + 1, "huono")}
          text="Huono"
        />
        <div><h1>Statistiikka</h1></div>
          <Statistics hyviä={this.state.hyvä} neutraaleja={this.state.neutraali} huonoja={this.state.huono} positiiviset = {this.laskePositiiviset()}/>
          <Statistic keskiarvo={this.laskeKeskiarvo()}/>
        </div>
    )
  }
}


const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
  {console.log(handleClick)}
    {text}
  </button>
)

const Statistic = ({ keskiarvo }) => {
  return (
    <div>Keskiarvo {keskiarvo}</div>
  )
}

const Statistics = ({ hyviä, neutraaleja, huonoja, positiiviset }) => {
  return (
    <div>
      <div>Hyviä {hyviä}</div>
      <div>Neutraaleja {neutraaleja}</div>
      <div>Huonoja {huonoja}</div>
      <div>Positiivisia {positiiviset}%</div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

*/

/*      UNICAFE 1.9 OSA 4 JA 1.10 OSA 5     

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyvä: 0,
      neutraali: 0,
      huono: 0,
      yhteensä: 0,
    }
  }

  onkoPalautteita() {
    let palautteita = false
    if(this.state.yhteensä!=0){
      palautteita = true
    }
    return palautteita
  }

  onkoNan(luku) {
    let palautettava
    if (isNaN(luku)) {
      palautettava = 0
    } else {
      palautettava = luku
    }
    return palautettava
  }

  laskeKeskiarvo() {
    let keskiarvo = (((this.state.hyvä + (-Math.abs(this.state.huono)))/this.state.yhteensä)*100)
    return this.onkoNan(keskiarvo)
  }

  laskePositiiviset() {
    let positiiviset = (((this.state.hyvä)/this.state.yhteensä)*100)
    return this.onkoNan(positiiviset)
  }

  asetaArvoon = (arvo,arviointi) => () => this.setState({[arviointi]: arvo, yhteensä: this.state.yhteensä+1})

  render() {
    let arvo = 1
    if(this.onkoPalautteita()){
      return(
        <div>
          <div><h1>Anna palautetta</h1></div>
          <Button
            handleClick={this.asetaArvoon(this.state.hyvä + 1, "hyvä")}
            text="Hyvä"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.neutraali + 1, "neutraali")}
            text="Neutraali"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.huono + 1, "huono")}
            text="Huono"
          />
        
          <div><h1>Statistiikka</h1></div>
            <Statistics hyviä={this.state.hyvä} neutraaleja={this.state.neutraali} huonoja={this.state.huono} positiiviset = {this.laskePositiiviset()}/>
            <Statistic keskiarvo={this.laskeKeskiarvo()}/>
          </div>
      ) 
    }else{
      return (
        <div>
          <div><h1>Anna palautetta</h1></div>
          <Button
            handleClick={this.asetaArvoon(this.state.hyvä + 1, "hyvä")}
            text="Hyvä"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.neutraali + 1, "neutraali")}
            text="Neutraali"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.huono + 1, "huono")}
            text="Huono"
          />
        
          <div><h1>Statistiikka</h1></div>
            <p>ei yhtään palautetta annettu</p>
          </div>
      )
    } //else
  }
}


const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
  {console.log(handleClick)}
    {text}
  </button>
)

const Statistic = ({ keskiarvo }) => {
  return (
    <div>Keskiarvo {keskiarvo}</div>
  )
}

const Statistics = ({ hyviä, neutraaleja, huonoja, positiiviset }) => {
  return (
    <div>
      <div>Hyviä {hyviä}</div>
      <div>Neutraaleja {neutraaleja}</div>
      <div>Huonoja {huonoja}</div>
      <div>Positiivisia {positiiviset}%</div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

*/

/*      1.11 UNICAFE OSA 6     

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      hyvä: 0,
      neutraali: 0,
      huono: 0,
      yhteensä: 0,
    }
  }

  onkoPalautteita() {
    let palautteita = false
    if(this.state.yhteensä!=0){
      palautteita = true
    }
    return palautteita
  }

  onkoNan(luku) {
    let palautettava
    if (isNaN(luku)) {
      palautettava = 0
    } else {
      palautettava = luku
    }
    return palautettava
  }

  laskeKeskiarvo() {
    let keskiarvo = (((this.state.hyvä + (-Math.abs(this.state.huono)))/this.state.yhteensä)*100)
    return this.onkoNan(keskiarvo)
  }

  laskePositiiviset() {
    let positiiviset = (((this.state.hyvä)/this.state.yhteensä)*100)
    return this.onkoNan(positiiviset)
  }

  asetaArvoon = (arvo,arviointi) => () => this.setState({[arviointi]: arvo, yhteensä: this.state.yhteensä+1})

  render() {
    let arvo = 1
    if(this.onkoPalautteita()){
      return(
        <div>
          <div><h1>Anna palautetta</h1></div>
          <Button
            handleClick={this.asetaArvoon(this.state.hyvä + 1, "hyvä")}
            text="Hyvä"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.neutraali + 1, "neutraali")}
            text="Neutraali"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.huono + 1, "huono")}
            text="Huono"
          />
        
          <div><h1>Statistiikka</h1></div>
            <Statistics hyviä={this.state.hyvä} neutraaleja={this.state.neutraali} huonoja={this.state.huono} positiiviset = {this.laskePositiiviset()}/>
            <Statistic keskiarvo={this.laskeKeskiarvo()}/>
          </div>
      ) 
    }else{
      return (
        <div>
          <div><h1>Anna palautetta</h1></div>
          <Button
            handleClick={this.asetaArvoon(this.state.hyvä + 1, "hyvä")}
            text="Hyvä"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.neutraali + 1, "neutraali")}
            text="Neutraali"
          />
          <Button
            handleClick={this.asetaArvoon(this.state.huono + 1, "huono")}
            text="Huono"
          />
        
          <div><h1>Statistiikka</h1></div>
            <p>ei yhtään palautetta annettu</p>
          </div>
      )
    } //else
  }
}


const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
  {console.log(handleClick)}
    {text}
  </button>
)

const Statistic = ({ keskiarvo }) => {
  return (
    <div>
      <table>
        <tr>
          <td>Keskiarvo {keskiarvo}</td>
        </tr>
      </table>
    </div>
  )
}

const Statistics = ({ hyviä, neutraaleja, huonoja, positiiviset }) => {
  return (
    <div>
      <table>
        <tr>
          <td>Hyviä {hyviä}</td>
        </tr>
        <tr>
          <td>Neutraaleja {neutraaleja}</td>
        </tr>
        <tr>
          <td>Huonoja {huonoja}</td>
        </tr>
        <tr>
          <td>Positiivisia {positiiviset}%</td>
        </tr>
      </table>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

*/   

/*       1.12 ANEKDOOTIT OSA 1      */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       selected: 0

    }
  }


  arvoSatunnaisluku = () => () => this.setState({selected: Math.floor((Math.random() * 6) + 0)})


  render() {
    return (
      <div>
        <div>
          {this.props.anecdotes[this.state.selected]}
        </div>
        <div>
          <Button
            handleClick={this.arvoSatunnaisluku()}
            text="next anecdote"
          />
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
  {console.log(handleClick)}
    {text}
  </button>
)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)