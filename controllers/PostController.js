const validator = require('express-validator')

const Post = require('./../models/Post')
const Tag = require('./../models/Tag')

const addTagToPost = async (postId, tag) =>
  Post.findByIdAndUpdate(
    postId,
    { $push: { tags: tag } },
    { new: true, useFindAndModify: false }
  )

const addPostToTag = async (tagId, post) =>
  Tag.findByIdAndUpdate(
    tagId,
    { $push: { posts: post } },
    { new: true, useFindAndModify: false }
  )

exports.all = async (req, res) => {
  const posts = await Post.find().sort('-createdAt')

  res.status(200).json({
    message: 'success',
    data: {
      posts,
    },
  })
}

exports.getOne = async (req, res) => {
  try {
    const post = await Post.find({ slug: req.params.slug })
      .populate('user')
      .populate('tags')

    if (!post) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'No Post Found !',
        },
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (err) {
    console.log('Error: ', err)

    res.status(400).json({
      status: 'fail',
      data: {
        errors: err.message,
      },
    })
  }
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
    const user = req.user._id

    const post = await Post.create({ user, title, body })

    if (typeof req.body.tags !== 'undefined' && req.body.tags.length > 0) {
      await Promise.all(
        req.body.tags.map(async (tag) => addTagToPost(post.id, tag))
      )

      await Promise.all(
        req.body.tags.map(async (tag) => addPostToTag(tag, post.id))
      )
    }

    res.status(201).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (err) {
    console.log('Error: ', err)

    res.status(400).json({
      status: 'fail',
      data: {
        errors: err.message,
      },
    })
  }
}

exports.update = async (req, res) => {
  try {
    // const post = await Post.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     title: req.body.title,
    //     body: req.body.body,
    //   },
    //   {
    //     new: true,
    //   }
    // )

    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'No Post Found !',
        },
      })
    }

    post.title = req.body.title
    post.body = req.body.body
    post.tags = undefined
    await post.save({ validateBeforeSave: false })

    if (typeof req.body.tags !== 'undefined' && req.body.tags.length > 0) {
      await Promise.all(
        req.body.tags.map(async (tag) => addTagToPost(post.id, tag))
      )

      await Promise.all(
        req.body.tags.map(async (tag) => addPostToTag(tag, post.id))
      )
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    })
  } catch (err) {
    console.log('Error: ', err)

    res.status(400).json({
      status: 'fail',
      data: {
        errors: err.message,
      },
    })
  }
}

exports.delete = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)

    if (!post) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'No Post Found !',
        },
      })
    }

    res.status(204).json({
      status: 'success',
    })
  } catch (err) {
    console.log('Error: ', err)

    res.status(400).json({
      status: 'fail',
      data: {
        errors: err.message,
      },
    })
  }
}
