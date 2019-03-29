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

  console.log('Router.post request.body', request.body)
  const body = request.body

  if(body.title === '' || body.url === ''){
    console.log('EMPTY title tai url')
    return response.json(400, 'bad request')
    //return response.statusMessage = 'Current password does not match'

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


module.exports = blogsRouter








