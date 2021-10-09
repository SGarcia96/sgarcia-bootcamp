const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  return likes.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  const blogMostLiked = blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
  delete blogMostLiked._id
  delete blogMostLiked.__v
  delete blogMostLiked.url
  return blogMostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
