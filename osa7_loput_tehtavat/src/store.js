import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  //visibilityFilter: visibilityFilterReducer,
  notify: notificationReducer,
  user: userReducer,
  //filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store