import React, { useState } from 'react'
import  { useField } from '../hooks'
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

  const submitNote = (e) => {
    e.preventDefault()
    store.store.dispatch(createAnecdote(e.target.note.value))
    inputHandler.reset()
  }
  
  return (
    <div>
      <h2>create new anecdote</h2>
      <form className="submitForm" onSubmit={submitNote}>
        <input type={inputHandler.value} name="note" value={inputHandler.value} onChange={inputHandler.onChange}/>
        <button className="button" type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

//<form onSubmit={store.store.dispatch(createAnecdote())}>

// <form className="submitForm" onSubmit={submitNote}>

