import React from 'react'
import { 
  voteAnecdote
} from '../reducers/anecdoteReducer' 
import { log } from 'util'


const Anecdotes = (store) => {

  //console.log('AnecdoteForm.js props', store.store.getState() )
  const anecdotes = store.store.getState()
  //console.log('Anecdotes')
  //const anecdotes = [1,2,3]
  return (
    <div>
      {anecdotes.map(anecdote => <div key={anecdote.id}> {anecdote.content} has {anecdote.votes} <button onClick={() => store.store.dispatch(voteAnecdote(anecdote.id))}>vote</button></div>)}
    </div>
  )
}

export default Anecdotes