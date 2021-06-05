// Global Imports

// Local Imports
const dotenv = require('dotenv')
const express = require('express')

// Configure Dotenv
dotenv.config({ path: './.env' })

// Project Imports
const database = require('./config/database')
const postRouter = require('./routes/Post')
const authRouter = require('./routes/Auth')

// Connect to database
database.connect()

// Initialize server
const app = express()

// Body Parser: Read data from the request body
app.use(express.json({ limit: '10kb' }))

// Register Routes
app.use('/posts', postRouter)
app.use('/auth', authRouter)

// Start app server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
