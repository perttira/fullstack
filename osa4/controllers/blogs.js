const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
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
blogsRouter.post('/', (request, response, next) => {

  const body = request.body

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
    likes: body.likes
  })

  blogArray = blogArray.concat(blog)

  blog.save()
    .then(blogs => {
      response.json(blogs)
    }).catch(error => next(error))
})
blogsRouter.delete('/:id', async (request, response, next) => {
  // id:tä ei löytynyt jos filter palauttaa tyhjän taulukon
  /*
  personsArray.map(note => console.log('note.id', note.id))

  if ( personsArray.filter(note => note.id == request.params.id).length != 0 ) {
    personsArray = personsArray.filter(note => note.id != request.params.id)
    */
  try{
    const blogs = await Blog.findOneAndDelete(request.params.id)
    response.json(blogs)
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

module.exports = blogsRouter








