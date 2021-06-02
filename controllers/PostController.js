const Post = require('./../models/Post')

exports.all = async (req, res) => {
  const posts = await Post.find()

  res.status(200).json({
    message: 'success',
    data: {
      posts,
    },
  })
}

exports.getOne = (req, res) => {
  res.send('Get One Post')
}

exports.create = (req, res) => {
  res.send('Create one post')
}

exports.update = (req, res) => {
  res.send('Update One Post')
}

exports.delete = (req, res) => {
  res.send('Delete One Post')
}
