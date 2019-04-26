const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



var blogArray = []

// osa4 4.1 blogilista, step1 && 4.2 blogilista, step2

/**
 * Random generator
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */

/*
blogsRouter.get('/', (request, response) => {

  Blog.find({}).then(blogs => {
    blogArray = blogs.map(blogs => blogs.toJSON())
    console.log('personsArray', blogArray)
    response.json(blogArray)
  })
})
*/

/**
 * Random generator
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note.toJSON())
      } else {
        response.status(204).end()
      }
    })
    .catch(error => next(error))
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

/*   */
blogsRouter.post('/', async (request, response, next) => {

  const body = request.body
  //const token = getTokenFrom(request)

  if(body.title === '' || body.url === ''){
    console.log('EMPTY title tai url')
    return response.json(400, 'bad request')
  }
  if(body.likes === ''){
    body.likes = 0
  }
  //blogArray = blogArray.concat(blog)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    console.log('decodedToken.id', decodedToken.id)

    const user = await User.findById(decodedToken.id)

    console.log('user', user)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    console.log('koira')

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())

  } catch(exception) {
    next(exception)
  }
})



blogsRouter.delete('/:id', async (request, response, next) => {
  
  //const body = request.id
  // id:tä ei löytynyt jos filter palauttaa tyhjän taulukon
  /*
  personsArray.map(note => console.log('note.id', note.id))

  if ( personsArray.filter(note => note.id == request.params.id).length != 0 ) {
    personsArray = personsArray.filter(note => note.id != request.params.id)
    */

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  console.log('request.params.id', request.params.id)

  const result = await Blog.findOne( { _id: request.params.id } )
  console.log('decodedToken.id', decodedToken.id)
  console.log('result', result)


  if(!result.user.toString() === decodedToken.id.toString() ){
    console.log('Käyttäjä on eri kuin blogin luoja')
    return response.json(400, 'bad request')
  }

  try{
    // TODO poistaa väärän (ensimmäisen?) blogin. Laita poistamaan id:n mukainen
    const result = await Blog.findOneAndDelete( { _id: request.params.id } )
    response.json(result)
  }catch(error){
    next(error)
  }

  /*
  Blog.findByIdAndRemove(request.params.id, (err) => {
    if (err) return response.status(500).send(err)
    return response.status(204).end()
  }).catch(error => next(error))
*/
})

blogsRouter.put('/:id', async (request, response, next) => {

  const body = request.body
  /*
  if(personsArray.find(function(element) {
    return request.params.id == element.id
  })){
    personsArray = personsArray.map(function(person){
      if(person.name === body.name) {
        person.number = body.number
      }
      return person
    })

    */
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, { $set: { title: body.title } }, { new: true })
    response.json(result)

  } catch (error) {
    next(error)
  }
  /*
    => {
      if (err) return response.status(500).send(err)
      return response.json(person)
    }).catch(error => next(error))
  } else {
    return response.status(400).json( { error: 'Did not find person from database' } )
  }
  */
})

module.exports = blogsRouter








