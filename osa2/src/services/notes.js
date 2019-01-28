import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const getAll = () => {
  return axios.get(baseUrl + "persons")
}

const create = (newObject) => {
  return axios.post(baseUrl + "persons", newObject)
}


// TODO tässä jotain vikaa, ei päivitä oikeaa ID:tä. Toisella persons päivityskierroksella id:t menee sekaisin?
const update = (id, newObject) => {
  newObject.id = ''
  console.log("${baseUrl + persons}/${id}", `${baseUrl + "persons"}/${id}`)
  return axios.put(`${baseUrl + "persons"}/${id}`, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl + "persons"}/${id}`)
}

/*const replace = (id) => {
  return axios.put(`${baseUrl + "persons"}/${id}`)
}
*/

export default { getAll, create, update, remove }