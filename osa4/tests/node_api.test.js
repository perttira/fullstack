const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialNotes = [
  {
    'title': 'Saatanalliset Sakeet',
    'author': 'Panu Loponen',
    'url': 'www.koira.com',
    'likes': '888'
  },
  {
    'title': 'Hitlerin muistelmat',
    'author': 'Panu Loponen',
    'url': 'www.google.com',
    'likes': '888'
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialNotes[0])
  await blogObject.save()

  blogObject = new Blog(initialNotes[1])
  await blogObject.save()
})


test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('right amount of notes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(2)
})

test('blog _id returned as id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.map(blog => blog.id)).toBeDefined()
})

test('adding blog adds blog by one in a right form', async () => {

  let blogObject = {
    'title': 'Testititle',
    'author': 'Testi Testinen',
    'url': 'www.testi.com',
    'likes': '123'
  }

  const responsePost = await api.post('/api/blogs').send(blogObject)
  const responseGetAll = await api.get('/api/blogs')
  const responseGetOne = await api.get('/api/blogs/' + responsePost.body.id)

  expect(responseGetOne.body).toMatchObject({
    'title': 'Testititle',
    'id': responsePost.body.id,
    'author': 'Testi Testinen',
    'url': 'www.testi.com',
    'likes': 123
  })

  expect(responseGetAll.body.length).toBe(initialNotes.length+1)
})


test('if title or url empty response data 400', async () => {

  let blogObject = {
    'title': '',
    'author': 'Testi Testinen',
    'url': 'www.testi.com',
    'likes': '123'
  }

  const response = await api.post('/api/blogs').send(blogObject)
  //const responseGetAll = await api.get('/api/blogs')
  //const responseGetOne = await api.get('/api/blogs/' + responsePost.body.id)
  //console.log('responsePost.error.text', response.status)
  console.log('response', response.res.statusMessage)
  console.log('response', response.res.statusCode)


  expect(response.res.statusCode + ' ' + response.res.statusMessage).toContain('400 Bad Request')


})


test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].content).toBe('HTML on helppoa')
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialNotes.length)
})



test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.content)

  expect(contents).toContain(
    'HTTP-protokollan tärkeimmät metodit ovat GET ja POST'
  )
})




afterAll(() => {
  mongoose.connection.close()
})
