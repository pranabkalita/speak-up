const express = require('express')

// Controllers
const AuthController = require('./../controllers/AuthController')

// Validators
const authValidator = require('./../validators/auth')

const router = express.Router()

router.post('/sign-up', authValidator.signUpValidator, AuthController.signUp)
router.post('/sign-in', authValidator.signInValidator, AuthController.signIn)
router.post('/sign-out', AuthController.signOut)

module.exports = router
