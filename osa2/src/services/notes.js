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

export default { getAll, create, update }