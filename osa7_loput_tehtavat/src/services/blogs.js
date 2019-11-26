/*
    Lisätään kirjautuneen käyttäjän token HTTP-pyynnön Authorization-headeriin.
    Moduulille on määritelty vain moduulin sisällä näkyvä muuttuja token, jolle
    voidaan asettaa arvo moduulin exporttaamalla funktiolla setToken.
    Async/await-syntaksiin muutettu create asettaa moduulin tallessa pitämän tokenin
    Authorization-headeriin, jonka se antaa axiosille metodin post kolmantena parametrina.
*/

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log('blogs.js newToken', newToken);
  token = `bearer ${newToken}`
}

/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
*/
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
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
  return response.data
}

export default { getAll, create, update, remove, setToken }