const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    aboutMe: String,
    photo: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

/** Hash the password before saving to database */
userSchema.pre('save', async function (next) {
  // Only if the password is modified
  if (!this.isModified('password')) return next()

  // Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12)

  next()
})

// Virtual Populate: One To Many
userSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'user',
  localField: '_id',
})

// Model Functions
userSchema.methods.isCorrectPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User
