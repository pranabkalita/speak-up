const validator = require('express-validator')

// Model
const Post = require('./../models/Post')
const Tag = require('./../models/Tag')

// Util
const { filterObj } = require('./../utils/request')

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
    const post = await Post.findOne({ slug: req.params.slug })
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
  // Check for validation error
  const errors = validator.validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 'fail', data: { errors: errors.array() } })
  }

  try {
    // Prepare FilterBody
    const filteredBody = filterObj(req.body, 'title', 'body')
    filteredBody.user = req.user._id

    // Include coverImage if exists
    if (req.files.coverImage && req.files.coverImage.length > 0)
      filteredBody.coverImage = req.files.coverImage[0].filename

    // Include images is exists
    if (req.files.images && req.files.images.length > 0) {
      const postImages = req.files.images.map((image) => image.filename)
      filteredBody.images = postImages
    }

    // Create Post
    const post = await Post.create(filteredBody)

    // Check if tags are provided for the post
    if (typeof req.body.tags !== 'undefined' && req.body.tags.length > 0) {
      // Add Tag reference to post
      await Promise.all(
        req.body.tags.map(async (tag) => addTagToPost(post.id, tag))
      )

      // Add Post reference to tag
      await Promise.all(
        req.body.tags.map(async (tag) => addPostToTag(tag, post.id))
      )
    }

    // Return status
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

    // Include coverImage if exists
    if (req.files.coverImage && req.files.coverImage.length > 0)
      post.coverImage = req.files.coverImage[0].filename

    // Include images is exists
    if (req.files.images && req.files.images.length > 0) {
      const postImages = req.files.images.map((image) => image.filename)
      post.images = postImages
    }

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
    const post = await Post.findById(req.params.id)
    await post.remove()

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
