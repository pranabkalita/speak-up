const Post = require('./../models/Post')

exports.home = async (req, res) => {
  const posts = await Post.find().sort('-createdAt')

  res.status(200).render('home', {
    title: 'All Posts',
    posts,
  })
}

exports.getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })

  res.status(200).render('post', {
    title: post.title,
    post,
  })
}

exports.about = (req, res) => {
  res.status(200).render('about', {
    title: 'About',
  })
}

exports.contact = (req, res) => {
  res.status(200).render('contact', {
    title: 'Contact',
  })
}

exports.login = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  })
}

exports.registration = (req, res) => {
  res.status(200).render('registration', {
    title: 'Register',
  })
}

exports.tags = (req, res) => {
  res.status(200).json({ page: 'Tags List' })
}

exports.createTag = (req, res) => {
  res.status(200).json({ page: 'Create Tag' })
}

exports.posts = async (req, res) => {
  const posts = await Post.find({ user: req.user.id })

  res.status(200).render('myPosts', {
    title: 'My Posts',
    posts,
  })
}

exports.editPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .sort('-createdAt')
      .populate('user')
      .populate('tags')

    if (!post) {
      return res.status(400).json({
        status: 'fail',
        data: {
          message: 'No Post Found !',
        },
      })
    }

    res.status(200).render('editPost', {
      title: post.title,
      post,
    })
  } catch (err) {
    console.log('Error: ', err)

    res.status(400).json({
      status: 'fail',
      data: {
        errors: err.message,
      },
    })
  }
}

exports.createPost = (req, res) => {
  res.status(200).render('createPost', {
    title: 'Create Post',
  })
}
