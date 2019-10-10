import React from 'react'
import { connect } from 'react-redux'
import  { setNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer' 
import { log } from 'util'
//import { log } from 'util'


const Anecdotes = (props) => {
  
  const submitVote = (id, content) => {
    props.voteAnecdote(id)
    props.setNotification('YOU VOTED ANECDOTE: '+ content +'!')
    
    setTimeout(() => {
        props.setNotification('')
    }, 5000)   
  }

  const filtteroi = props.visibleNotes.filter(anecdotes => anecdotes.content.startsWith(props.filter))

  return (
    <div>
      {filtteroi.map(anecdote => <div key={anecdote.id}> {anecdote.content} has {anecdote.votes} <button onClick={() => submitVote(anecdote.id, anecdote.content) }>vote</button></div>)}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, visibilityFilter }) => {
  if (visibilityFilter === 'ALL') {
    return anecdotes
  }
    return visibilityFilter === 'IMPORTANT'
    ? anecdotes.filter(note => note.important)
    : anecdotes.filter(note => !note.important)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    visibilityFilter: state.visibilityFilter,
    filter: state.filter,
    visibleNotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes)

