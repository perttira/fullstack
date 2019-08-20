/*  Varsinaisen sovelluslogiikan määrittelevä tiedosto app.js ottaa
    määrittelemämme routerin käyttöön seuraavasti:

    const notesRouter = require('./controllers/notes')
    app.use('/api/notes', notesRouter)

    Näin määrittelemäämme routeria käytetään jos polun alkuosa on /api/notes.
    notesRouter-olion sisällä täytyy tämän takia käyttää ainoastaan polun loppuosia,
    eli tyhjää polkua / tai pelkkää parametria /:id. Tiedostossa siis otetaan käyttöön
    joukko middlewareja, näistä yksi on polkuun /api/notes kiinnitettävä notesRouter
    (tai notes-kontrolleri niin kuin jotkut sitä kutsuisivat). */

const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')



logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



var custom_token = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    JSON.stringify(req.body),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})

app.use(bodyParser.json(), custom_token)

module.exports = app


