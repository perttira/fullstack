import { switchCase } from "@babel/types"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

var anecdoteObject

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sort = (anecdotes) => {
  let sortedBlogs = anecdotes.sort(function (a, b) {
    return b.votes - a.votes
  })

  console.log('sort() sortedBlogs', sortedBlogs)
  return sortedBlogs
}

const initialState = anecdotesAtStart.map(asObject)


//const sortedState = sort(initialState)

//console.log('sortedState', sortedState)







const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  console.log('action.type', action.type)

  switch (action.type) {
    case 'NEW_NOTE':
      console.log('counterReducer case "NEW_NOTE"')
      console.log('action', action)
      console.log('action.data', action.data)
    /*
      anecdoteObject = {
        content: action.data.content,
        id: getId(),
        important: false,
        votes: 0
      }
      */

      state.push(action.data)

      console.log('state', state)
   
      return sort(state)
    case 'VOTE':
      console.log('counterReducer case "VOTE"')
      console.log('counterReducer case "VOTE" action.data', action.data)

      let newAnecdotesList = state.map(anecdote => {
      if(anecdote.id === action.id){
        console.log('iffissä')
        anecdoteObject = anecdote
        anecdoteObject.votes++      
        anecdote = anecdoteObject
      }
        return anecdote
      })      
        return sort(newAnecdotesList)     
    case 'BAD':
      console.log('counterReducer case "BAD"')
      return state = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }
    case 'ZERO':
      return state = {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return sort(state)
  }
}

export const voteAnecdote = (id) => {
  return {type: 'VOTE', id: id}
}

export const createAnecdote = (content) => {
  //console.log('createAnecdote metodissa')

  anecdoteObject = {
    type: 'NEW_NOTE',
    data: {
      content: content,
      id: getId(),
      votes: 0,
      important: false
    }
  }
  return anecdoteObject
}

export default (reducer)