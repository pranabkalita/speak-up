const editPostForm = document.getElementById('editPostForm')

if (editPostForm) {
  editPostForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const postId = document.getElementById('postId').value
    const title = document.getElementById('title').value
    const body = document.getElementById('body').value
    const coverImage = document.getElementById('coverImage').files[0]

    try {
      const form = new FormData()
      form.append('title', title)
      form.append('body', body)
      form.append('coverImage', coverImage)

      const res = await axios({
        method: 'PATCH',
        url: `http://127.0.0.1:3000/api/posts/${postId}`,
        data: form,
      })

      if (res.data.status === 'success') {
        showAlert('success', 'Post Updated !')
        // window.setTimeout(() => {
        //   location.reload(true)
        // }, 4000)
      }
    } catch (err) {
      showAlert('danger', 'Please check all the details !')
    }
  })
}
