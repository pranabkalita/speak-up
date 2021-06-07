const express = require('express')

// Controllers
const postController = require('../controllers/PostController')

// Validators
const postValidator = require('./../validators/post')

// Middlewares
const authMiddleware = require('./../middlewares/auth')
const postMiddleware = require('./../middlewares/post')

const router = express.Router()

router.get('/', postController.all)
router.get('/:slug', postController.getOne)
router.post(
  '/',
  authMiddleware.protect,
  postMiddleware.uploadPostImage,
  postValidator.createValidator,
  postController.create
)
router.patch(
  '/:id',
  authMiddleware.protect,
  postMiddleware.uploadPostImage,
  postController.update
)
router.delete('/:id', authMiddleware.protect, postController.delete)

module.exports = router
