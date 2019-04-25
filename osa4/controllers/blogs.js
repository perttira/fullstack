const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


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
    const blogs = await Blog.find({})
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

/*   */
blogsRouter.post('/', async (request, response, next) => {


  // TODO laita uusi koodi toimimaan ennen kuin jatkat lukemista
  const body = request.body

  const user = await User.findById(body.userId)

  if(body.title === '' || body.url === ''){
    console.log('EMPTY title tai url')
    return response.json(400, 'bad request')
  }
  if(body.likes === ''){
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  blogArray = blogArray.concat(blog)

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedNote.toJSON())
  } catch(exception) {
    next(exception)
  }
})
blogsRouter.delete('/:id', async (request, response, next) => {
  // id:tä ei löytynyt jos filter palauttaa tyhjän taulukon
  /*
  personsArray.map(note => console.log('note.id', note.id))

  if ( personsArray.filter(note => note.id == request.params.id).length != 0 ) {
    personsArray = personsArray.filter(note => note.id != request.params.id)
    */
  try{
    const result = await Blog.findOneAndDelete(request.params.id)
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








