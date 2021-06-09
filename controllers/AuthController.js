const validator = require('express-validator')
const jwt = require('jsonwebtoken')

const User = require('./../models/User')

exports.signUp = async (req, res) => {
  const errors = validator.validationResult(req)

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 'fail', data: { errors: errors.array() } })
  }

  try {
    const { name, email, aboutMe, password } = req.body

    const user = await User.create({ name, email, aboutMe, password })

    res.status(201).json({
      status: 'success',
      data: {
        user,
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

exports.signIn = async (req, res) => {
  // 1) Check for validation error
  const errors = validator.validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // 2) Check if the user exists and the provided password is correct
  const { email, password } = req.body
  const user = await User.findOne({ email, isActive: { $ne: false } }).select(
    '+password'
  )

  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      data: { message: 'Invalid email or password !' },
    })
  }

  // 3) If everything is fine, generate a token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

  // Cookie Options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

  res.cookie('jwt', token, cookieOptions)

  // 4) Send response with the JWT token
  user.password = undefined
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  })
}

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('posts')

    res.status(200).json({
      status: 'success',
      data: {
        user,
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

exports.signOut = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({ status: 'success' })
}
