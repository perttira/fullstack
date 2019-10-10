import React, { useState } from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import  { setNotification } from '../reducers/notificationReducer'
import  { createAnecdote } from '../reducers/anecdoteReducer'
import { visibilityFilterChange } from '../reducers/visibilityFilterReducer'
//import anecdoteService from '../services/anecdotes'

import { log } from 'util'


const AnecdoteForm = (props) => {
  const inputHandler = useField('text')

  //const [noteField, setNoteField] = useState('')

  //console.log('AnecdoteForm.js props', store.store.getState() )
  //const anecdotes = store.store.getState()
  //console.log('Anecdotes')
  //const anecdotes = [1,2,3]

  const submitAnecdote = async (e) => {
    e.preventDefault()
    
    //props.createAnecdote(e.target.note.value)
    const content = e.target.note.value
    e.target.note.value = ''
    console.log('AnecdoteForm submitAnecdote content', content)
    //const newNote = await createAnecdote(content)
    props.createAnecdote(content)
    props.setNotification('YOU MADE A NEW ANECDOTE!', 5000)
      
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
 

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  visibilityFilterChange
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)

