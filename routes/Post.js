const express = require('express')

const postController = require('../controllers/PostController')

const router = express.Router()

router.get('/', postController.allPosts)

module.exports = router
