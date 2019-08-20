const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if(body.password.length < 3) {
      console.log('user password too short')
      return response.json(400, 'bad request').json({
        error: 'user password too short or missing'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

/*  Dokumenttitietokannan liitoksen tekeminen suoritetaan Mongoosen komennolla populate.
    Populaten yhteydessä on myös mahdollista rajata mitä kenttiä sisällytettävistä dokumenteista otetaan mukaan 
    Populaten parametri määrittelee, että user-dokumenttien notes-kentässä olevat note-olioihin viittaavat id:t korvataan niitä vastaavilla dokumenteilla*/

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter