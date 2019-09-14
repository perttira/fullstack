const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
        console.log('counterReducer case "GOOD"')
        console.log('state', state)
      return state = {
        good: state.good+1,
        ok: state.ok,
        bad: state.bad
      }
    case 'OK':
      console.log('counterReducer case "Ok"')
      return state = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }
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
    default: return state
  }
  
}

/*
const getState = (state, action) => { 
  switch (action.type) {
    case 'GOOD':
      return state.good
       
    case 'OK':
      return state.ok
    case 'BAD':
      return state.bad
    case 'ZERO':
      return state
    default: return state
  }
}

*/


export default counterReducer 