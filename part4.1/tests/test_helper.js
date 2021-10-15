const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')

const initialBlogs = [
  {
    title: 'blog test',
    author: 'fernando',
    url: 'http://blogtest.com',
    likes: 10,
    id: '61614e2fb94687df5b846f86'
  },
  {
    title: 'blog maravilla',
    author: 'paqui',
    url: 'http://blogmaravilla.com',
    likes: 46,
    id: '61614ea9b94687df5b846f8a'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, api, nonExistingId, blogsInDb
}
