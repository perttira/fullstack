/* Ympäristömuuttujien käsittely on eriytetty moduulin utils/config.js vastuulle */

if (process.env.NODE_ENV === 'production') {
  require('dotenv').config()
}

let PORT = process.env.PORT || 3001
let MONGODB_URI = process.env.MONGODB_URI

//console.log('process.env.MONGODB_URI', process.env.MONGODB_URI)

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT
}