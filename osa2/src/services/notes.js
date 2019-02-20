import axios from 'axios'

// Vaihda baseUrl jos haluat ottaa muihin tietokantoihin yhteyttä (osa3 ja heroku)

/* localhost paitsi nyt proxy päällä package.json -tiedostossa */
//const baseUrl = 'http://localhost:3001/api/persons'

/* heroku */
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (newObject) => {
  //newObject.id = ''
  //console.log("${baseUrl + persons}/${id}", `${baseUrl + "persons"}/${id}`)
  return axios.put(`${baseUrl}/${newObject.id}`, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

/*const replace = (id) => {
  return axios.put(`${baseUrl + "persons"}/${id}`)
}
*/

export default { getAll, create, update, remove }