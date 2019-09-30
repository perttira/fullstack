import React from 'react'
import { connect } from 'react-redux'
import  { setNotification } from '../reducers/notificationReducer'
import { 
  voteAnecdote
} from '../reducers/anecdoteReducer' 
import { log } from 'util'
//import { log } from 'util'


const Anecdotes = (props) => {
  
  //console.log('AnecdoteList props.anecdotes', props.notes)

  //console.log('AnecdoteList props.filter', props.filter)
  /*
  Huomaa miten storen tilan kentät on otettu tuttuun tapaan
  destrukturoimalla apumuuttujiin 
  */
 // const { anecdotes, visibilityFilter } = store.store.getState()
  
  const anecdotesToShow = () => {
    if (props.filter === 'ALL') {
      return props.notes
    }

    return props.filter === 'IMPORTANT'
      ? props.notes.filter(note => note.important)
      : props.notes.filter(note => !note.important)
  }
  const submitVote = (id, content) => {
    props.store.dispatch(voteAnecdote(id))
    props.store.dispatch(setNotification('YOU VOTED ANECDOTE: '+ content +'!'))
    
    setTimeout(() => {
        props.store.dispatch(setNotification(''))
    }, 5000)   
  }

  return (
    <div>
      {anecdotesToShow().map(anecdote => <div key={anecdote.id}> {anecdote.content} has {anecdote.votes} <button onClick={() => submitVote(anecdote.id, anecdote.content) }>vote</button></div>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notes: state.anecdotes,
    filter: state.filter,
  }
}

export default connect(mapStateToProps)(Anecdotes)

