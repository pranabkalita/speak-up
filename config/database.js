const mongoose = require('mongoose')

exports.connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/speak-up', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.warn('Connected to DB !')
  } catch (error) {
    console.error(e.message)
    process.exit(1)
  }
}
