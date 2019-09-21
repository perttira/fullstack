import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'

const store = createStore(reducer)

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)

// 6.3: anekdootit, step1
// 6.4: anekdootit, step2
// 6.5*: anekdootit, step3
// 6.6: anekdootit, step4
// 6.7: anekdootit, step5
// 6.8: anekdootit, step6





