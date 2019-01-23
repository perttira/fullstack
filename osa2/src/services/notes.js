import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const getAll = () => {
  return axios.get(baseUrl + "db")
}

const create = (newObject) => {
  return axios.post(baseUrl + "persons", newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl + "persons"}/${id}`)
}

export default { getAll, create, update, remove }