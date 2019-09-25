import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import visibilityFilterReducer from './reducers/visibilityFilterReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers } from 'redux'
//import { createAnecdote } from './reducers/anecdoteReducer'
//import { filterChange } from './reducers/visibilityFilterReducer'
//import { setNotification } from './reducers/notificationReducer'


const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  visibilityFilter: visibilityFilterReducer,
  notify: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer)

//store.subscribe(() => console.log(store.getState()))
//store.dispatch(filterChange('IMPORTANT'))
//store.dispatch(createAnecdote('combineReducers forms one reduces from many simple reducers'))
//store.dispatch(setNotification('VAROITUS'))
//console.log('store.getState().notify', store.getState().notify)


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
// 6.9 anekdootit, step7
// 6.10 paremmat anekdootit, step8
// 6.11* paremmat anekdootit, step9








