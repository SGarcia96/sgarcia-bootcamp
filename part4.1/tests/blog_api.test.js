const mongoose = require('mongoose')
const server = require('../index')
const Blog = require('../models/Blog')
const { api, initialBlogs, blogsInDb } = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first blog is made by fernando', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].author).toBe('fernando')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const title = response.body.map(blog => blog.title)
  expect(title).toContain('blog maravilla')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'newblog',
    author: 'new',
    url: 'http://blogmaravillaasdsadsa.com',
    likes: 50
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await blogsInDb()
  const titles = blogs.map(blogs => blogs.title)

  expect(blogs).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'newblog'
  )
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'new',
    url: 'http://blogmaravillaasdsadsa.com',
    likes: 50
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogs = await blogsInDb()

  expect(blogs).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
