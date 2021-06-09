// DOM ELEMENTS
const loginForm = document.getElementById('loginForm')
const logoutButton = document.getElementById('logoutButton')

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    try {
      const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/auth/sign-in',
        data: { email, password },
      })

      if (res.data.status === 'success') {
        showAlert('success', "You've logged in !")
        window.setTimeout(() => {
          location.assign('/')
        }, 4000)
      }
    } catch (err) {
      showAlert(
        'danger',
        'Please fill all the details or invalid credentials !'
      )
    }
  })
}

if (logoutButton) {
  logoutButton.addEventListener('click', async (e) => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:3000/api/auth/sign-out',
      })

      if (res.data.status === 'success') {
        showAlert('success', 'You have been logged out.')
        location.assign('/')
      }
    } catch (err) {
      showAlert('danger', 'Error logging out. Try again.')
    }
  })
}
