const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const tagSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
)

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
