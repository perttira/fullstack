import React from 'react'
import { 
  voteAnecdote
} from '../reducers/anecdoteReducer' 
import { log } from 'util'


const Anecdotes = (store) => {
  
  /*
  Huomaa miten storen tilan kentät on otettu tuttuun tapaan
  destrukturoimalla apumuuttujiin 
  */
  const { anecdotes, filter } = store.store.getState()

  const anecdotesToShow = () => {
    if ( filter === 'ALL' ) {
      return anecdotes
    }
    return filter === 'IMPORTANT'
      ? anecdotes.filter(anecdote => anecdote.important)
      : anecdotes.filter(anecdote => !anecdote.important)
  }

  return (
    <div>
      {anecdotesToShow().map(anecdote => <div key={anecdote.id}> {anecdote.content} has {anecdote.votes} <button onClick={() => store.store.dispatch(voteAnecdote(anecdote.id))}>vote</button></div>)}
    </div>
  )
}

export default Anecdotes