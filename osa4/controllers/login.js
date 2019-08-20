/*  Koodi aloittaa etsimällä pyynnön mukana olevaa usernamea vastaavan käyttäjän tietokannasta. 
    Seuraavaksi katsotaan onko pyynnön mukana oleva password oikea. Koska tietokantaan ei ole talletettu
    salasanaa, vaan salasanasta laskettu hash, tehdään vertailu metodilla bcrypt.compare */



const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  console.log('body.username', body.username)
  console.log('body.password', body.password)

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = loginRouter