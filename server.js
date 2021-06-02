const express = require('express')

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
