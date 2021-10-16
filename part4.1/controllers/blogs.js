const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
  response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).end()
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const newBlogInfo = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlogInfo, { new: true })
  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
