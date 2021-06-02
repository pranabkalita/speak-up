const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema(
  {
    title: String,
    slug: String,
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

const Post = mongoose.model('Post', postSchema)

module.exports = Post
