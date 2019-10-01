import React from 'react'
import { connect } from 'react-redux'
import  { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer' 
import { log } from 'util'
//import { log } from 'util'


const Anecdotes = (props) => {
  
  console.log('AnecdoteList props.anecdotes', props.anecdotes)

  console.log('AnecdoteList props.filter', props.filter)
  /*
  Huomaa miten storen tilan kentät on otettu tuttuun tapaan
  destrukturoimalla apumuuttujiin 
  */
 // const { anecdotes, visibilityFilter } = store.store.getState()
  
  const anecdotesToShow = () => {
    if (props.visibilityFilter === 'ALL') {
      return props.anecdotes
    }

    return props.visibilityFilter === 'IMPORTANT'
      ? props.anecdotes.filter(note => note.important)
      : props.anecdotes.filter(note => !note.important)
  }
  const submitVote = (id, content) => {
    props.voteAnecdote(id)
    props.setNotification('YOU VOTED ANECDOTE: '+ content +'!')
    
    setTimeout(() => {
        props.setNotification('')
    }, 5000)   
  }

  console.log('AnecdoteList.js anecdotesToShow()', anecdotesToShow())
  const filtteroi = anecdotesToShow().filter(anecdotes => anecdotes.content.startsWith(props.filter))
  console.log('filtteroi', filtteroi)


  return (
    <div>
      {filtteroi.map(anecdote => <div key={anecdote.id}> {anecdote.content} has {anecdote.votes} <button onClick={() => submitVote(anecdote.id, anecdote.content) }>vote</button></div>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    visibilityFilter: state.visibilityFilter,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

