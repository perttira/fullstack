const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')



const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})


//noteSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Blog', blogSchema)