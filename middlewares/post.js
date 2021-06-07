const multer = require('multer')

const multerStorage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'public/img/posts')
  },
  filename: (req, file, callBack) => {
    // post-postID-timestamp.ext
    const ext = file.mimetype.split('/')[1]
    callBack(null, `user-${req.user.id}-${Date.now()}.${ext}`)
  },
})

const multerFilter = (req, file, callBack) => {
  if (file.mimetype.startsWith('image')) {
    callBack(null, true)
  } else {
    callBack(new Error('Invalid file uploaded !'), false)
  }
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter })

exports.uploadPostImage = upload.single('coverImage')
