const editPostForm = document.getElementById('editPostForm')
const createPostForm = document.getElementById('createPostForm')
const deletePostForm = document.getElementById('deletePostForm')

if (editPostForm || createPostForm) {
  const postForm = editPostForm ? editPostForm : createPostForm
  postForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const postId = document.getElementById('postId').value
    const title = document.getElementById('title').value
    const body = document.getElementById('body').value

    const coverImage = document.getElementById('coverImage').files[0]
    const image1 = document.getElementById('image1').files[0]
    const image2 = document.getElementById('image2').files[0]
    const image3 = document.getElementById('image3').files[0]

    try {
      const form = new FormData()
      form.append('title', title)
      form.append('body', body)
      form.append('coverImage', coverImage)
      form.append('images', image1)
      form.append('images', image2)
      form.append('images', image3)

      let res

      if (editPostForm) {
        res = await axios({
          method: 'PATCH',
          url: `http://127.0.0.1:3000/api/posts/${postId}`,
          data: form,
        })
      } else {
        res = await axios({
          method: 'POST',
          url: `http://127.0.0.1:3000/api/posts`,
          data: form,
        })
      }

      if (res.data.status === 'success') {
        showAlert('success', 'Post Updated !')
        window.setTimeout(() => {
          location.assign('/posts')
        }, 2000)
      }
    } catch (err) {
      showAlert('danger', 'Please check all the details !')
    }
  })
}

if (deletePostForm) {
  deletePostForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
      const postId = document.getElementById('postId').value
      const res = await axios({
        method: 'DELETE',
        url: `http://127.0.0.1:3000/api/posts/${postId}`,
      })

      showAlert('success', 'Post Deleted !')
      window.setTimeout(() => {
        location.assign('/posts')
      }, 2000)
    } catch (err) {
      showAlert('danger', 'Please check all the details !')
    }
  })
}
