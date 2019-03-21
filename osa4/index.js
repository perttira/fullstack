const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})


// OSA4 tehtävät 4.1 blogilista, step1  4.2 blogilista, step2
// 4.3: apufunktioita ja yksikkötestejä, step1 && 4.4: apufunktioita ja yksikkötestejä, step2
// 4.5*: apufunktioita ja yksikkötestejä, step3 && 4.6*: apufunktioita ja yksikkötestejä, step4
// && 4.7*: apufunktioita ja yksikkötestejä, step5

