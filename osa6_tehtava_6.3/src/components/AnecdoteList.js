import React from 'react'
import  { setNotification } from '../reducers/notificationReducer'
import { 
  voteAnecdote
} from '../reducers/anecdoteReducer' 
import { log } from 'util'


const Anecdotes = (store) => {
  
  /*
  Huomaa miten storen tilan kentät on otettu tuttuun tapaan
  destrukturoimalla apumuuttujiin 
  */
  const { anecdotes, visibilityFilter } = store.store.getState()

    //console.log('Anecdotelist.js visibilityFilter', visibilityFilter)

  const anecdotesToShow = () => {
    if ( visibilityFilter === 'ALL' ) {
      return anecdotes
    }
    return visibilityFilter === 'IMPORTANT'
      ? anecdotes.filter(anecdote => anecdote.important)
      : anecdotes.filter(anecdote => !anecdote.important)
  }

  const submitVote = (id, content) => {
    store.store.dispatch(voteAnecdote(id))
    store.store.dispatch(setNotification('YOU VOTED ANECDOTE: '+ content +'!'))
    
    setTimeout(() => {
        store.store.dispatch(setNotification(''))
    }, 5000)   
  }

  const filtteroi = anecdotesToShow().filter(anecdote => anecdote.content.startsWith(store.store.getState().filter))

  return (
    <div>
      {filtteroi.map(anecdote => <div key={anecdote.id}> {anecdote.content} has {anecdote.votes} <button onClick={() => submitVote(anecdote.id, anecdote.content) }>vote</button></div>)}
    </div>
  )
}

export default Anecdotes