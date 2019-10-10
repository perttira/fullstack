import { switchCase } from "@babel/types"
import anecdoteService from '../services/anecdotes'


const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
    votes: 0
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
    votes: 0
  },
]
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
*/

const getId = () => (100000 * Math.random()).toFixed(0)

var anecdoteObject

const sort = (anecdotes) => {
  let sortedBlogs = anecdotes.sort(function (a, b) {
    return b.votes - a.votes
  })
  return sortedBlogs
}

/* älä muuta reducerin statea! Vaan palauta uusi haluttu tila */
const reducer = (state = [], action) => {

  switch (action.type) {
    case 'NEW_NOTE':
      console.log('anecdoteReducer case "NEW_NOTE"')
      console.log('anecdoteReducer case "NEW_NOTE" action.data', action.data)

      return sort([...state, action.data])

      /*
      Puretaan tää vaikka osiin:
      [...state, action.data]
      const copy = []
      state.forEach(e => copy.push(e))
      copy.push(action.data)
      */

    case 'VOTE':
      console.log('anecdoteReducer case "VOTE"')

      let newAnecdotesList = state.map(anecdote => {
      if(anecdote.id === action.id){
        anecdoteObject = anecdote
        anecdoteObject.votes++      
        anecdote = anecdoteObject
      }
        return anecdote
      })      
        return sort(newAnecdotesList)     
    case 'BAD':
      console.log('anecdoterReducer case "BAD"')
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
    case 'INIT_NOTES':
    return action.data
    
    default: return sort(state)
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}
export const voteAnecdote = (id) => {
  return {type: 'VOTE', id: id}
}

export const createAnecdote = (data) => {
  data.votes = 0
    return {
      type: 'NEW_NOTE',
      data
    }
  }

export default (reducer)