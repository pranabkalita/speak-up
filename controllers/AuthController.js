const validator = require('express-validator')

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

exports.signIn = (req, res) => {
  res.send('Sign In')
}

exports.signOut = (req, res) => {
  res.send('Sign Out')
}
