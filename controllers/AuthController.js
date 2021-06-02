const User = require('./../models/User')

exports.signUp = (req, res) => {
  res.send('Sign Up')
}

exports.signIn = (req, res) => {
  res.send('Sign In')
}

exports.signOut = (req, res) => {
  res.send('Sign Out')
}
