const mongoose = require('mongoose')
const slugify = require('slugify')
const { Schema } = require('mongoose')

const tagSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Document Middleware: runs before .save() and .create()
tagSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })

  next()
})

/** Remove reference from Post when a Tag is deleted. */
tagSchema.pre('remove', async function (next) {
  await this.model('Post').updateMany(
    { tags: this._id },
    { $pull: { tags: this._id } },
    { multi: true },
    next
  )
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
