const express = require('express')

// Controller
const viewController = require('./../controllers/ViewController')

const viewRouter = express.Router()

viewRouter.get('/', viewController.home)
viewRouter.get('/about', viewController.about)
viewRouter.get('/contact', viewController.contact)
viewRouter.get('/login', viewController.login)
viewRouter.get('/registration', viewController.registration)
viewRouter.get('/tags', viewController.tags)
viewRouter.get('/tags/create', viewController.createTag)
viewRouter.get('/posts', viewController.posts)
viewRouter.get('/posts/create', viewController.createPost)

module.exports = viewRouter
