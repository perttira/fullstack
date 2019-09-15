import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    console.log('vote', id)
    props.store.dispatch({type: 'VOTE', id: id})

  }

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    props.store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content,
        important: false,
        id: 0
      }
    })
    event.target.note.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name="note"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App