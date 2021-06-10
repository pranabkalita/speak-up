const mongoose = require('mongoose')
const slugify = require('slugify')
const { Schema } = mongoose

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A post must belong to a user.'],
    },
    title: {
      type: String,
      unique: [true, 'A Post already exists with this title.'],
      required: [true, 'A Post must have a title.'],
    },
    slug: { type: String, unique: true },
    body: { type: String, required: [true, 'A Post must have a body.'] },
    coverImage: String,
    images: [String],
    isDraft: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Document Middleware: runs before .save() and .create()
postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })

  next()
})

/** Remove reference from Tag when a Post is deleted. */
postSchema.pre('remove', async function (next) {
  await this.model('Tag').updateMany(
    { posts: this._id },
    { $pull: { posts: this._id } },
    { multi: true },
    next
  )
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
