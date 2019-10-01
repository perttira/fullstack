import React, { useState } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import  { setNotification } from '../reducers/notificationReducer'
import { 
  createAnecdote
} from '../reducers/anecdoteReducer' 

import { log } from 'util'


const AnecdoteForm = (store) => {
  const inputHandler = useField('text')

  //const [noteField, setNoteField] = useState('')

  //console.log('AnecdoteForm.js props', store.store.getState() )
  //const anecdotes = store.store.getState()
  //console.log('Anecdotes')
  //const anecdotes = [1,2,3]

  const submitAnecdote = (e) => {
    e.preventDefault()
    store.store.dispatch(createAnecdote(e.target.note.value))
    inputHandler.reset()
    store.store.dispatch(setNotification('YOU MADE A NEW ANECDOTE!'))
    
    setTimeout(() => {
        store.store.dispatch(setNotification(''))
    }, 5000)
      
  }
  
  return (
    <div>
      <h2>Create new anecdote</h2>
      <form className="submitForm" onSubmit={submitAnecdote}>
        <input type={inputHandler.value} name="note" value={inputHandler.value} onChange={inputHandler.onChange}/>
        <button className="button" type="submit">create</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

export default connect(mapStateToProps)(AnecdoteForm)
//<form onSubmit={store.store.dispatch(createAnecdote())}>

// <form className="submitForm" onSubmit={submitNote}>

