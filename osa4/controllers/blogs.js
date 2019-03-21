const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
var blogArray

// osa4 4.1 blogilista, step1 && 4.2 blogilista, step2

/**
 * Random generator
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
blogsRouter.get('/', (request, response) => {

  Blog.find({}).then(blogs => {
    blogArray = blogs.map(blogs => blogs.toJSON())
    console.log('personsArray', blogArray)
    response.json(blogArray)
  })
})

/*   */
blogsRouter.post('/', (request, response, next) => {

  const body = request.body

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







