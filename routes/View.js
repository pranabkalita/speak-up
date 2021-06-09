const express = require('express')

// Controller
const viewController = require('./../controllers/ViewController')

// Middleware
const auth = require('./../middlewares/auth')

const viewRouter = express.Router()

viewRouter.get('/', auth.isLoggedIn, viewController.home)
viewRouter.get('/posts/:slug', auth.isLoggedIn, viewController.getPost)
viewRouter.get('/about', viewController.about)
viewRouter.get('/contact', viewController.contact)
viewRouter.get('/login', viewController.login)
viewRouter.get('/register', viewController.registration)
viewRouter.get('/tags', auth.isLoggedIn, viewController.tags)
viewRouter.get('/tags/create', auth.isLoggedIn, viewController.createTag)
viewRouter.get('/posts', auth.protect, viewController.posts)
viewRouter.get('/posts/:slug/edit', auth.protect, viewController.editPost)
viewRouter.get('/posts/create', auth.isLoggedIn, viewController.createPost)

module.exports = viewRouter
