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
const viewRouter = require('./routes/View')

// Connect to database
database.connect()

// Initialize server
const app = express()

// Setup view engine and view path
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

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
app.use('', viewRouter)
app.use('/api/posts', postRouter)
app.use('/api/auth', authRouter)
app.use('/api/tags', tagROuter)

// Handle Unhandled routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server.`,
  })
})

// Start app server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
