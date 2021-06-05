const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

exports.protect = async (req, res, next) => {
  // 1) Get the token and check if it exists
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      data: {
        message: 'Not authorized !',
      },
    })
  }

  // 2) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // 3) Check if the user still exists and not deleted
  const freshUser = await User.findById(decoded.id)

  if (!freshUser) {
    return res.status(401).json({
      status: 'fail',
      data: {
        message: 'The user no longer exists!',
      },
    })
  }

  // 4) Grant access to the route
  req.user = freshUser
  next()
}
