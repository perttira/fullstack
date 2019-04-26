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
// && 4.7*: apufunktioita ja yksikkötestejä, step5 && 4.8: blogilistan testit, step 1
// 4.9*: blogilistan testit, step2 && 4.10: blogilistan testit, step3 && 4.10: blogilistan testit, step3
// 4.11*: blogilistan testit, step4 && 4.12*: blogilistan testit, step5
// 4.13 blogilistan laajennus, step1 && 4.14* blogilistan laajennus, step2
// 4.15: blogilistan laajennus, step4 && 4.16*: blogilistan laajennus, step5
// 4.17: blogilistan laajennus, step6 && 4.18: blogilistan laajennus, step7
// 4.19: blogilistan laajennus, step8 && 4.20*: blogilistan laajennus, step9













