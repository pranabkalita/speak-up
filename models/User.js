const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    aboutMe: String,
    photo: { type: String },
    isActive: { type: Boolean, default: false },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
