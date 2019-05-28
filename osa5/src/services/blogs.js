
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (newObject) => {
  console.log('newObject id', newObject.id)
  const id = newObject.id
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const create = async noteObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, noteObject, config)
  console.log('response.data', response.data)
  return response.data
}

export default { getAll, create, update, remove, setToken }