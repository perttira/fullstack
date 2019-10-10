import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import visibilityFilterReducer from './reducers/visibilityFilterReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  visibilityFilter: visibilityFilterReducer,
  notify: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store