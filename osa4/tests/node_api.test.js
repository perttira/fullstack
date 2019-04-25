const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')



const initialNotes = [
  {
    'title': 'Testi Kirjanen',
    'author': 'Satu Olento',
    'url': 'www.koira.com',
    'likes': '888'
  },
  {
    'title': 'Koiran muistelmat',
    'author': 'Testi Hommeli',
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

/*

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


*/

/*

describe('All tests', async () => {

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
    expect(response.res.statusCode + ' ' + response.res.statusMessage).toContain('400 Bad Request')
  })

  test('if likes empty set it to zero', async () => {

    let blogObject = {
      'title': 'Testi Tampio',
      'author': 'Testi Testinen',
      'url': 'www.testi.com',
      'likes': ''
    }
    const response = await api.post('/api/blogs').send(blogObject)
    expect(response.body.likes).toBe(0)
  })
}) //describet All tests

*/


describe('when there is initially one user at db', async () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
}) // describe 'when there is initially one user at db'


describe('when there is initially one user at db', async () => {
  // ...

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})  // describe 'when there is initially one user at db'


describe('Teahtava 4.15 blogilistan laajennus step4', async () => {
  beforeEach(async () => {
    await User.deleteMany({})
    //const user = new User({ username: 'root', password: 'sekret' })
    //await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
