const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose
  .connect('mongodb://localhost:27017/speak-up', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('CONNECTED TO DB !')
  })
  .catch((err) => {
    console.warn('ERROR : ', err)
  })

const app = express()

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/about', (req, res) => {
  res.send('About Page')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})
