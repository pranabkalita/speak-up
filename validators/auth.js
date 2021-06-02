const validator = require('express-validator')

exports.signUpValidator = [
  validator.check('name', 'Name is required.').notEmpty(),
  validator.check('email', 'Please include a valid email.').isEmail(),
  validator
    .check('aboutMe', 'About me should be in between 5 to 50 characters long.')
    .isLength({ min: 5, max: 50 }),
  validator.check('password', 'Please provide a strong password.').notEmpty(),
  validator
    .check('passwordConfirm', 'Please confirm your password.')
    .custom(async (confirmPassword, { req }) => {
      const { password } = req.body

      if (password !== confirmPassword) {
        throw new Error('Passwords must be same.')
      }
    }),
]
