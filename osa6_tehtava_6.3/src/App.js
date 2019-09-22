import React from 'react'
import Anecdotes from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import VisibilityFilter from './components/VisibilityFilter'



const App = (props) => {

  const filterSelected = (value) => () => {
    console.log(value)
  }
  //const store = props.store
  //const anecdotes = store.getState()

  /*
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    props.store.dispatch(createAnecdote(content))
    event.target.note.value = ''
  }
  */

  
 console.log('App.js props', props)

  return (
    <div>
      <Anecdotes store={props.store}/>
      <VisibilityFilter store={props.store} />
      <AnecdoteForm store={props.store}/>
    </div>
    
  )
}

export default App