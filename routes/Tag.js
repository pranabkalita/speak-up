const express = require('express')

// Controllers
const tagController = require('../controllers/TagController')

// Validators
const tagValidator = require('./../validators/tag')

// Middlewares
const authMiddleware = require('./../middlewares/auth')

const router = express.Router()

router.get('/', tagController.all)
router.get('/:slug', tagController.getOne)
router.post(
  '/',
  authMiddleware.protect,
  tagValidator.createValidator,
  tagController.create
)
router.patch('/:id', authMiddleware.protect, tagController.update)
router.delete('/:id', authMiddleware.protect, tagController.delete)

module.exports = router
