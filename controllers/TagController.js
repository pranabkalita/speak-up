const validator = require('express-validator')

const Tag = require('./../models/Tag')

exports.all = async (req, res) => {
  const tags = await Tag.find().sort('-createdAt')

  res.status(200).json({
    message: 'success',
    data: {
      tags,
    },
  })
}

exports.getOne = async (req, res) => {
  try {
    const tag = await Tag.find({ slug: req.params.slug }).populate('posts')

    if (!tag) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'No Tag Found !',
        },
      })
    }

    res.status(200).json({
      status: 'success',
      data: {
        tag,
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
    const { title } = req.body

    const tag = await Tag.create({ title })

    res.status(201).json({
      status: 'success',
      data: {
        tag,
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

    const tag = await Tag.findById(req.params.id)

    if (!tag) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'No Tag Found !',
        },
      })
    }

    tag.title = req.body.title
    await tag.save({ validateBeforeSave: false })

    res.status(200).json({
      status: 'success',
      data: {
        tag,
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
    const tag = await Tag.findById(req.params.id)
    await tag.remove()

    if (!tag) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'No Tag Found !',
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
