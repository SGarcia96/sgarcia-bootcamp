const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    required: true
  },
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = model('Blog', blogSchema)

module.exports = Blog
