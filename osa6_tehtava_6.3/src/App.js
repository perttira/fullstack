import React from 'react'
import Anecdotes from './components/AnecdoteList'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import { log } from 'util'



const App = (props) => {


  //const anecdotes = store.getState()

  /*
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    props.store.dispatch(createAnecdote(content))
    event.target.note.value = ''
  }
  */

  
 //console.log('App.js props', props)

  return (
    <div>
      <Notification/>
      <Filter/>
      <Anecdotes/>
      <VisibilityFilter />
      {/*<AnecdoteForm store={props.store}/>*/}
    </div>
    
  )
}

export default App