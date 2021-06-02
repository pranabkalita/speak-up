// Global Imports

// Local Imports
const express = require('express')

// Project Imports
const database = require('./config/database')
const postRouter = require('./routes/Post')

// Connect to database
database.connect()

// Initialize server
const app = express()

// Register Routes
app.use('/posts', postRouter)

// Start app server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
