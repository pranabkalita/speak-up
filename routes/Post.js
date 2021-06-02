const express = require('express')

const postController = require('../controllers/PostController')

const router = express.Router()

router.get('/', postController.all)
router.get('/:id', postController.getOne)
router.post('/', postController.create)
router.patch('/:id', postController.update)
router.delete('/:id', postController.delete)

module.exports = router
