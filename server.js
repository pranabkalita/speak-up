// Global Imports
const path = require('path')

// Local Imports
const dotenv = require('dotenv')
const express = require('express')

// Configure Dotenv
dotenv.config({ path: './.env' })

// Project Imports
const database = require('./config/database')
const postRouter = require('./routes/Post')
const authRouter = require('./routes/Auth')
const tagROuter = require('./routes/Tag')

// Connect to database
database.connect()

// Initialize server
const app = express()

// STATIC File: Server static files
app.use(express.static(path.join(__dirname, 'public')))

// Body Parser: Read data from the request body
app.use(
  express.json({
    limit: '10kb',
  })
)
app.use(express.urlencoded({ extended: true }))

// Register Routes
app.use('/posts', postRouter)
app.use('/auth', authRouter)
app.use('/tags', tagROuter)

// Start app server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
