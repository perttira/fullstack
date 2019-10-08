import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Anecdotes from './components/AnecdoteList'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { initializeNotes } from './reducers/anecdoteReducer'

import { log } from 'util'



const App = (props) => {
  
  useEffect(() => {
    anecdoteService
      .getAll().then(notes => props.initializeNotes(notes))
  },[])

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
      <AnecdoteForm/>
    </div>
    
  )
}

export default connect(null, { initializeNotes })(App)
