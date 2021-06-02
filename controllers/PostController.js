const validator = require('express-validator')

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

exports.create = async (req, res) => {
  const errors = validator.validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 'fail', data: { errors: errors.array() } })
  }

  try {
    const { title, body } = req.body

    const post = await Post.create({ title, body })

    res.status(200).json({
      message: 'success',
      data: {
        post,
      },
    })
  } catch (err) {
    console.log('Error: ', err)

    res.status(400).json({
      message: 'fail',
      data: {
        errors: err.message,
      },
    })
  }
}

exports.update = (req, res) => {
  res.send('Update One Post')
}

exports.delete = (req, res) => {
  res.send('Delete One Post')
}
