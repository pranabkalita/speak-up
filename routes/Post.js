const express = require('express')

// Controllers
const postController = require('../controllers/PostController')

// Validators
const postValidator = require('./../validators/post')

// Middlewares
const authMiddleware = require('./../middlewares/auth')

const router = express.Router()

router.get('/', postController.all)
router.get('/:slug', postController.getOne)
router.post(
  '/',
  authMiddleware.protect,
  postValidator.createValidator,
  postController.create
)
router.patch('/:id', authMiddleware.protect, postController.update)
router.delete('/:id', authMiddleware.protect, postController.delete)

module.exports = router
