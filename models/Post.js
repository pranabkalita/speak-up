const mongoose = require('mongoose')
const slugify = require('slugify')
const { Schema } = mongoose

const postSchema = new Schema(
  {
    title: {
      type: String,
      unique: [true, 'A Post already exists with this title.'],
      required: [true, 'A Post must have a title.'],
    },
    slug: { type: String, unique: true },
    body: { type: String, required: [true, 'A Post must have a title.'] },
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
