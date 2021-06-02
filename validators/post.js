const validator = require('express-validator')

exports.createValidator = [
  validator.check('title', 'A Post must have a title.').notEmpty(),
  validator.check('body', 'A Post must have a body').notEmpty(),
]

exports.updateValidator = this.createValidator
