import axios from 'axios'
import { log } from 'util'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {

  console.log('anecdotes.js content', content)
  const object = { content, important: false, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, createNew }