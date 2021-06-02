const mongoose = require('mongoose')
const slugify = require('slugify')
const { Schema } = mongoose

const postSchema = new Schema(
  {
    title: { type: String, unique: true },
    slug: { type: String, unique: true },
    body: String,
    coverImage: String,
    images: Array,
    isDraft: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)

// Document Middleware: runs before .save() and .create()
postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })

  next()
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
