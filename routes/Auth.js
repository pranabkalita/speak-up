const express = require('express')

const AuthController = require('./../controllers/AuthController')

const router = express.Router()

router.post('/sign-up', AuthController.signUp)
router.post('/sign-in', AuthController.signIn)
router.post('/sign-out', AuthController.signOut)

module.exports = router
