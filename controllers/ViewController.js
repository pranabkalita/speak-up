const Post = require('./../models/Post')

exports.home = async (req, res) => {
  const posts = await Post.find().sort('-createdAt')

  res.status(200).render('home', {
    title: 'All Posts',
    posts,
  })
}

exports.getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })

  res.status(200).render('post', {
    title: post.title,
    post,
  })
}

exports.about = (req, res) => {
  res.status(200).render('about')
}

exports.contact = (req, res) => {
  res.status(200).json({ page: 'Contact' })
}

exports.login = (req, res) => {
  res.status(200).json({ page: 'Login' })
}

exports.registration = (req, res) => {
  res.status(200).json({ page: 'Registration' })
}

exports.tags = (req, res) => {
  res.status(200).json({ page: 'Tags List' })
}

exports.createTag = (req, res) => {
  res.status(200).json({ page: 'Create Tag' })
}

exports.posts = (req, res) => {
  res.status(200).json({ page: 'Posts List' })
}

exports.createPost = (req, res) => {
  res.status(200).json({ page: 'Create Post' })
}
