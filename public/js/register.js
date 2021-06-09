// DOM ELEMENTS
const registerForm = document.getElementById('registerForm')

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('passwordConfirm').value

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/auth/sign-up',
        data: { name, email, password, passwordConfirm },
      })

      if (res.data.status === 'success') {
        showAlert('success', "You've been registered. Please log in !")
        window.setTimeout(() => {
          location.assign('/login')
        }, 4000)
      }
    } catch (err) {
      showAlert('danger', 'Please fill all the details !')
    }
  })
}
