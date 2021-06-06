const validator = require('express-validator')

exports.createValidator = [
  validator.check('title', 'A Tag must have a title.').notEmpty(),
]
