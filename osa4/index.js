const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})


// OSA4 tehtävät 4.1 blogilista, step1  4.2 blogilista, step2
// 4.3: apufunktioita ja yksikkötestejä, step1

