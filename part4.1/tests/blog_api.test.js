const mongoose = require('mongoose')
const server = require('../index')
const Blog = require('../models/Blog')
const { api, initialBlogs, blogsInDb } = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET /api/blogs/', () => {
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
})

describe('POST /api/blogs/', () => {
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

  test('verifies if the title and url are missing and return 400', async () => {
    const newPost = {
      author: 'Edsger W. Dijkstra',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)

    const blog = await blogsInDb()

    expect(blog).toHaveLength(initialBlogs.length)
  })
})

describe('GET /api/blogs a specific blog', () => {
  test('single blog can be viewed', async () => {
    const blogsAtStart = await blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('with property id must be unique', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body.map(blog => blog.id)
    expect(id).toBeDefined()
  })
})

describe('DELETE /api/blogs/:id a specific blog', () => {
  test('single blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
