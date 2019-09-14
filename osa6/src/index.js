import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import { log } from 'util';

const store = createStore(reducer)

const App = () => {
  const changeState = (state) => {
    switch (state) {
      case 'good':
        store.dispatch({type: 'GOOD'})
        console.log('changeState case"GOOD"')
        break
      case 'ok':
        store.dispatch({type: 'OK'})
        break
      case 'bad':
        store.dispatch({type: 'BAD'})
        break
      case 'zero':
        store.dispatch({type: 'ZERO'})
        break
        //return state
      default: break
    }
  }
/*
    store.dispatch({
      type: 'GOOD'
    })
  }
*/
  store.subscribe(() => {
    const storeNow = store.getState()
    console.log('storeNow', storeNow)
  })

  return (
    <div>
      <button onClick={() => changeState('good')}>hyvä</button> 
      <button onClick={() => changeState('ok')}>neutraali</button> 
      <button onClick={() => changeState('bad')}>huono</button>
      <button onClick={() => changeState('zero')}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

// 6.1: unicafe revisited, step1 
// 6.2: unicafe revisited, step2
