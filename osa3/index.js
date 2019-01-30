const http = require('http')
const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: 'HTML on helppoa',
      date: '2017-12-10T17:30:31.098Z',
      important: true
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      date: '2017-12-10T18:39:34.091Z',
      important: false
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      date: '2017-12-10T19:20:14.298Z',
      important: true
    }
  ]
  
  app.get('/notes/:id', (request, response) => {
    const id = request.params.id
    console.log(id)
    const note = notes.find(note => note.id === id)
    console.log(note)
    response.json(note)
  })
  
  app.get('/notes', (req, res) => {
    res.json(notes)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })