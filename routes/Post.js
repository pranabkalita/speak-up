const express = require('express')

// Controllers
const postController = require('../controllers/PostController')

// Validators
const postValidator = require('./../validators/post')

const router = express.Router()

router.get('/', postController.all)
router.get('/:slug', postController.getOne)
router.post('/', postValidator.createValidator, postController.create)
router.patch('/:id', postController.update)
router.delete('/:id', postController.delete)

module.exports = router
